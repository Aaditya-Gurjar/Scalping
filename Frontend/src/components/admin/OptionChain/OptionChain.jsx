import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import { GET_EXPIRY_DATE, Get_Symbol, TradeExecutionAPI } from '../../CommonAPI/Admin';
import './OptionChainForm.css';
import Content from '../../../ExtraComponent/Content';
import { Get_All_Plans, GetStrikeToken } from '../../CommonAPI/User';
import { connectWebSocket } from '../../user/UserDashboard/LivePrice';
import $ from 'jquery';
import Table from 'react-bootstrap/Table';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import axios from 'axios';
import qs from 'qs';
import Swal from 'sweetalert2'; 
import { toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  

const OptionChainForm = () => {
  const [symbol, setSymbol] = useState([]);
  const [expiry, setExpiry] = useState([]);
  const [strikeToken, setStrikeToken] = useState([]);
  const [formValues, setFormValues] = useState({
    exchange: 'NFO',
    instrument: '',
    symbol: '',
    expiryDate: '',
    planname: '',
  });
  const UserName = localStorage.getItem("name");
  const Role = localStorage.getItem("Role");
  const [planNames, setPlanNames] = useState([]);
  const [exitTime, setExitTime] = useState('14:55'); // State for Exit Time
  const [keyInput, setKeyInput] = useState(''); // State for Key Input

  const showLivePrice = async (channelList) => {
    connectWebSocket(channelList, (data) => {
      if (data.lp && data.tk) {
        let LivePrice = $(".LivePrice_" + data.tk).html(data.lp);
        // console.log("Updated Price Data:", data);
      }
    });
  };

  const getAllPlans = async () => {
    try {
      const response = await Get_All_Plans();
      // console.log("All Plans:", response);

      if (response?.Admin && response?.Charting) {
        const combinedPlans = [
          // ...response.Admin.map(plan => ({ ...plan, type: 'Admin' })),
          ...response.Charting.map(plan => ({ ...plan, type: 'Charting' }))
        ];
        setPlanNames(combinedPlans);
        
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    getAllPlans();
  },[])

  const showLivePriceForSpecific = (channel) => {
    return new Promise((resolve, reject) => {
      connectWebSocket(channel, (data) => {
        try {
          if (data.lp && data.tk) {
            // console.log("Live Price:", data.lp);
            resolve(data.lp);
          }
        } catch (error) {
          console.error("Error in showLivePriceForSpecific:", error);
          reject(error);
        }
      });
    });
  };

  useEffect(() => {
    const initializeDefaults = async () => {
      const firstExchange = 'NFO'; // Default exchange
      const firstInstrument = getInstrumentOptions(firstExchange)[0]?.value;
  
      if (firstInstrument) {
        const req = { exchange: firstExchange, instrument: firstInstrument };
        const symbolResponse = await Get_Symbol(req);
  
        if (symbolResponse?.Symbol?.length > 0) {
          const firstSymbol = symbolResponse.Symbol[0];
          const expiryResponse = await GET_EXPIRY_DATE({
            Exchange: firstExchange,
            Instrument: firstInstrument,
            Symbol: firstSymbol,
            Strike: "",
          });
  
          if (expiryResponse["Expiry Date"]?.length > 0) {
            const firstExpiry = expiryResponse["Expiry Date"][0];
  
            setFormValues({
              exchange: firstExchange,
              instrument: firstInstrument,
              symbol: firstSymbol,
              expiryDate: firstExpiry,
              planname: '',
            });
  
            setSymbol(symbolResponse.Symbol);
            setExpiry(expiryResponse["Expiry Date"]);
          }
        }
      }
    };
  
    initializeDefaults();
  }, []);

  const fetchSymbol = async (currentValues) => {
    try {
      const req = {
        Exchange: currentValues.exchange,
        Instrument: currentValues.instrument,
      };
      const response = await Get_Symbol(req);
      setSymbol(response.Symbol);

      if (response.Symbol?.length > 0) {
        const firstSymbol = response.Symbol[0];
        setFormValues(prev => ({ ...prev, symbol: firstSymbol }));
        FetchExpiry({ ...currentValues, symbol: firstSymbol });
      }
    } catch (error) {
      console.error("Error fetching symbol:", error);
    }
  };

  const FetchExpiry = async (currentValues) => {
    try {
      const req = {
        Exchange: currentValues.exchange,
        Instrument: currentValues.instrument,
        Symbol: currentValues.symbol,
        Strike: ""
      };
      const response = await GET_EXPIRY_DATE(req);
      setExpiry(response["Expiry Date"]);

      if (response["Expiry Date"]?.length > 0) {
        const firstExpiry = response["Expiry Date"][0];
        setFormValues(prev => ({ ...prev, expiryDate: firstExpiry }));
      }
    } catch (error) {
      console.error("Error fetching expiry date:", error);
    }
  };

  const fetchStrikeToken = async (currentValues) => {
    try {
      const requiredFields = ["exchange", "instrument", "symbol", "expiryDate"];
      const isMissing = requiredFields.some((field) => !currentValues[field]);
      if (isMissing) return;

      const req = {
        Exchange: currentValues.exchange,
        Instrument: currentValues.instrument,
        Symbol: currentValues.symbol,
        Expiry: currentValues.expiryDate,
      };

      const response = await GetStrikeToken(req);
      setStrikeToken(response?.StrikeTokens);
      const channelList = response.SubscriptionChain;
      showLivePrice(channelList);
    } catch (error) {
      console.error("Error fetching strike token:", error);
    }
  };

  useEffect(() => {
    fetchStrikeToken(formValues);
  }, [formValues]);

  const exchangeOptions = [
    { value: 'NFO', label: 'NFO' },
    { value: 'MCX', label: 'MCX' }
  ];

  const getInstrumentOptions = (exchange) => {
    if (exchange === 'NFO') {
      return [
        { value: 'OPTIDX', label: 'OPTIDX' },
        { value: 'OPTSTK', label: 'OPTSTK' }
      ];
    } else if (exchange === 'MCX') {
      return [{ value: 'OPTFUT', label: 'OPTFUT' }];
    } else {
      return [];
    }
  };

  const symbolOptions = symbol.map(item => ({ value: item, label: item }));
  const strategyOptions = [
    { value: 'Straddle', label: 'Straddle' },
    { value: 'Strangle', label: 'Strangle' }
  ];

  const validateFields = () => {
    const requiredFields = {
      Exchange: formValues.exchange,
      Instrument: formValues.instrument,
      Symbol: formValues.symbol,
      ExpiryDate: formValues.expiryDate,
      PlanName: formValues.planname,
      Key: keyInput,
    };
  
    const emptyFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);
  
    if (emptyFields?.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Fill All Fields',
        text: `Please fill the following fields: ${emptyFields.join(', ')}`,
      });
      return false;
    }
    return true;
  };

  const excecuteTrade = async (tradeType, type, strike, token) => {
    if (!validateFields()) return; // Validate fields before proceeding
  
    try {
    
  
      const exchange = formValues.exchange;
      const symbol = formValues.symbol;
      const planname = formValues.planname;
  
      let LivePrice = await showLivePriceForSpecific(`${exchange}|${token}`);
       
      const req = {
        Planname: planname,
        Username: UserName,
        User: Role,
        Optiontype: type,
        Exchange: exchange,
        StrikePrice: strike,
        Expirydate: formValues.expiryDate,
        Symbol: symbol,
        TType: tradeType.toUpperCase(),
        Target: 0,
        Sl: 0,
        Exittime:"15:29:00", // Use formatted Exit Time
        Ordertype: "Market",
        ETime: "14:04:39",
        Price: LivePrice,
        Key: keyInput, // Pass keyInput here
        Demo: "Demo"
      };
  
      let data = qs.stringify(req);
  
      const res = await TradeExecutionAPI(data);
       
      // Show success toast with API response
      toast.success(res.message)
    } catch (error) {
      console.error("Error fetching live price:", error);

      // Show error toast
      toast.error(`Trade Execution Failed`);
    }
  };

  const OptionChainColumn = [
    {
      name: "Trade",
      label: "Call Trade",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "4px 10px",
                border: "none",
                borderRadius: "3px",
                marginRight: "6px",
                fontSize: "16px",
                cursor: "pointer"
              }}
              onClick={() => excecuteTrade("Buy", "CE", tableMeta.rowData.Strike, tableMeta.rowData.CE)}
            >
              Buy
            </button>
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "4px 10px",
                border: "none",
                borderRadius: "3px",
                fontSize: "16px",
                cursor: "pointer"
              }}
              onClick={() => excecuteTrade("Sell", "CE", tableMeta.rowData.Strike, tableMeta.rowData.CE)}
            >
              Sell
            </button>
          </>
        ),
      }
    },
    {
      name: "CE", label: "Call", options: {
        filter: true, sort: true, customBodyRender: (value) => (
          <>
            <span className={`LivePrice_${value} LivePirce_fontSize`} style={{ fontSize: "20px" }}>-</span>
          </>
        )
      }
    },
    { name: "Strike", label: "Strike", options: { filter: true, sort: true } },
    {
      name: "PE", label: "Put", options: {
        filter: true, sort: true, customBodyRender: (value) => (
          <>
            <span className={`LivePrice_${value} LivePirce_fontSize`} style={{ fontSize: "20px" }}>-</span>
          </>
        )
      }
    },
    {
      name: "Trade",
      label: "Put Trade",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "4px 10px",
                border: "none",
                borderRadius: "3px",
                marginRight: "6px",
                fontSize: "16px",
                cursor: "pointer"
              }}
              onClick={() => excecuteTrade("Buy", "PE", tableMeta.rowData.Strike, tableMeta.rowData.PE)}
            >
              Buy
            </button>
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "4px 10px",
                border: "none",
                borderRadius: "3px",
                fontSize: "16px",
                cursor: "pointer"
              }}
              onClick={() => excecuteTrade("Sell", "PE", tableMeta.rowData.Strike, tableMeta.rowData.PE)}
            >
              Sell
            </button>
          </>
        ),
      }
    },
  ];

  return (
    <Content
      Page_title={" 📉 Option Chain"}
      button_status={false}
      backbutton_status={true}
    >
      <Formik
        initialValues={formValues}
        onSubmit={values => {
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="ocf-form">
            <div className="ocf-container-row">
              {/* Top row with 4 parameters */}
              <div className="ocf-group">
                <label>Exchange</label>
                <Select
                  name="exchange"
                  options={exchangeOptions}
                  value={exchangeOptions.find(option => option.value === formValues.exchange)}
                  onChange={(selectedOption) => {
                    setFieldValue('exchange', selectedOption.value);
                    const firstInstrument = getInstrumentOptions(selectedOption.value)[0]?.value;
                    setFieldValue('instrument', firstInstrument);
                    setFormValues(prev => ({
                      ...prev,
                      exchange: selectedOption.value,
                      instrument: firstInstrument,
                      symbol: '',
                      expiryDate: ''
                    }));
                    fetchSymbol({ exchange: selectedOption.value, instrument: firstInstrument });
                  }}
                  placeholder="Select Exchange"
                  className="ocf-select card-bg-color card-text-color"
                />
              </div>

              <div className="ocf-group">
                <label>Instrument</label>
                <Select
                  name="instrument"
                  options={getInstrumentOptions(formValues.exchange)}
                  value={getInstrumentOptions(formValues.exchange).find(option => option.value === formValues.instrument)}
                  onChange={(selectedOption) => {
                    setFieldValue('instrument', selectedOption.value);
                    setFormValues(prev => ({
                      ...prev,
                      instrument: selectedOption.value,
                      symbol: '',
                      expiryDate: ''
                    }));
                    fetchSymbol({ ...formValues, instrument: selectedOption.value });
                  }}
                  placeholder="Select Instrument"
                  className="ocf-select card-bg-color card-text-color"
                />
              </div>

              <div className="ocf-group">
                <label>Symbol</label>
                <Select
                  name="symbol"
                  options={symbolOptions}
                  value={symbolOptions.find(option => option.value === formValues.symbol)}
                  onChange={(selectedOption) => {
                    setFieldValue('symbol', selectedOption.value);
                    setFormValues(prev => ({
                      ...prev,
                      symbol: selectedOption.value,
                      expiryDate: ''
                    }));
                    FetchExpiry({ ...formValues, symbol: selectedOption.value });
                  }}
                  placeholder="Select Symbol"
                  className="ocf-select card-bg-color card-text-color"
                  styles={{
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: '200px'
                    })
                  }}
                />
              </div>

              <div className="ocf-group">
                <label>Expiry Date</label>
                <Select
                  name="expiryDate"
                  options={expiry.map(date => ({ value: date, label: date }))}
                  value={expiry.map(date => ({ value: date, label: date })).find(option => option.value === formValues.expiryDate)}
                  onChange={(selectedOption) => {
                    setFieldValue('expiryDate', selectedOption.value);
                    setFormValues(prev => ({ ...prev, expiryDate: selectedOption.value }));
                  }}
                  placeholder="Select Expiry"
                  className="ocf-select card-bg-color card-text-color"
                  styles={{
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: '200px'
                    })
                  }}
                />
              </div>
            </div>

            <div className="ocf-container-row">
              {/* Bottom row with 3 parameters */}
              <div className="ocf-group">
                <label>Plan Name</label>
                <Select
                  name="planname"
                  options={planNames.map(plan => ({ value: plan.Planname, label: plan.Planname }))}
                  value={planNames
                    .map(plan => ({ value: plan.Planname, label: plan.Planname }))
                    .find(option => option.value === values.planname)}
                  onChange={(selectedOption) => {
                    setFieldValue('planname', selectedOption.value);
                    setFormValues(prev => ({ ...prev, planname: selectedOption.value }));
                  }}
                  placeholder="Select Strategy"
                  className="ocf-select card-bg-color card-text-color"
                />
              </div>

              <div className="ocf-group">
                <label>Key</label>
                <Field
                  name="key"
                  type="text"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="Enter Key"
                  className="ocf-control"
                />
              </div>

              {/* <div className="ocf-group">
                <label>Exit Time</label>
                <TimePicker
                  onChange={setExitTime}
                  value={exitTime}
                  disableClock={true}
                  clearIcon={null}
                  className="ocf-control"
                />
              </div> */}
            </div>
          </Form>
        )}
      </Formik>

      <Table bordered hover={false} responsive className="mt-4 modern-table">
        <thead className="modern-table-header">
          <tr>
            {OptionChainColumn.map((col, index) => (
              <th key={index} className="text-center">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {strikeToken?.length > 0 ? (
            strikeToken.map((row, rowIndex) => {
              const middleRowIndex = Math.floor(strikeToken?.length / 2);
              const rowStyle = rowIndex === middleRowIndex
                ? { backgroundColor: '#d3d3d3' } // Gray color for the middle row
                : { backgroundColor: '#ffffff' }; // White color for all other rows

              return (
                <tr key={rowIndex} style={rowStyle}>
                  {OptionChainColumn.map((col, colIndex) => (
                    <td key={colIndex} className="text-center">
                      {col.options?.customBodyRender
                        ? col.options.customBodyRender(row[col.name], { rowData: row })
                        : row[col.name] || '-'}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={OptionChainColumn?.length} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Content>
  );
};

export default OptionChainForm;
