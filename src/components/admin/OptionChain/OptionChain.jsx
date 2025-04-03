import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import { GET_EXPIRY_DATE, Get_Symbol } from '../../CommonAPI/Admin';
import './OptionChainForm.css';
import Content from '../../../ExtraComponent/Content';
import { GetStrikeToken } from '../../CommonAPI/User';
import { connectWebSocket } from '../../user/UserDashboard/LivePrice';
import $ from 'jquery';
import Table from 'react-bootstrap/Table';

const OptionChainForm = () => {
  const [symbol, setSymbol] = useState([]);
  const [expiry, setExpiry] = useState([]);
  const [strikeToken, setStrikeToken] = useState([]);
  const [formValues, setFormValues] = useState({
    exchange: 'NFO', // Default to NFO
    instrument: '',
    symbol: '',
    expiryDate: ''
  });

  const showLivePrice = async (channelList) => {
    connectWebSocket(channelList, (data) => {
      if (data.lp && data.tk) {
        $(".LivePrice_" + data.tk).html(data.lp);
        console.log("Updated Price Data:", data);
      }
    });
  };

  useEffect(() => {
    const initializeDefaults = async () => {
      const firstInstrument = getInstrumentOptions('NFO')[0]?.value;
      if (firstInstrument) {
        setFormValues(prev => ({
          ...prev,
          instrument: firstInstrument
        }));
        const req = { exchange: 'NFO', instrument: firstInstrument };
        await fetchSymbol(req);
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

      if (response.Symbol.length > 0) {
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

      if (response["Expiry Date"].length > 0) {
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
              onClick={() => console.log(" Buy", tableMeta.rowData, formValues.exchange)}
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
              onClick={() => console.log("  Sell", tableMeta.rowData, formValues.exchange)}
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
              onClick={() => console.log("Classic Buy", tableMeta.rowData, formValues.exchange)}
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
              onClick={() => console.log("Modern Sell", tableMeta.rowData, formValues.exchange)}
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
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="ocf-form">
            <div className="ocf-container-row">
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

              <div className="ocf-group">
                <label>PlanName</label>
                <Select
                  name="planname"
                  options={strategyOptions}
                  value={strategyOptions.find(option => option.value === values.planname)}
                  onChange={(selectedOption) => {
                    setFieldValue('planname', selectedOption.value);
                  }}
                  placeholder="Select Strategy"
                  className="ocf-select card-bg-color card-text-color"
                />
              </div>
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
          {strikeToken.length > 0 ? (
            strikeToken.map((row, rowIndex) => {
              const middleRowIndex = Math.floor(strikeToken.length / 2);
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
              <td colSpan={OptionChainColumn.length} className="text-center">
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
