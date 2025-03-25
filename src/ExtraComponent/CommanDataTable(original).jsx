import React, { useState, useCallback, useMemo, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { right } from "@popperjs/core";

const FullDataTable = ({ data, columns, onRowSelect, checkBox, isChecked }) => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(columns.slice(0, 7));
  const [tempSelectedColumns, setTempSelectedColumns] = useState(
    columns.slice(0, 7)
  );
  const [checkedRows, setCheckedRows] = useState(
    isChecked !== undefined ? [isChecked] : []
  );
const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setSelectedColumns(columns.slice(0, 7));
    setTempSelectedColumns(columns.slice(0, 7));
  }, [columns]);

  console.log("selectedColumns", selectedColumns)

  // Memoized modal handlers
  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  const handleColumnChange = useCallback(
    (columnName) => {
      const columnToAdd = columns.find((col) => col.name === columnName);
      if (tempSelectedColumns.some((col) => col.name === columnName)) {
        setTempSelectedColumns((prev) =>
          prev.filter((col) => col.name !== columnName)
        );
      } else if (columnToAdd) {
        setTempSelectedColumns((prev) => [...prev, columnToAdd]);
      }
    },
    [columns, tempSelectedColumns]
  );

  const handleSelectAll = () => {
    console.log("isExpanded", isExpanded)
    if(isExpanded){
      setIsModalOpen(false)
      setSelectedColumns(columns)
    }
    else{
      setIsModalOpen(false)
      setSelectedColumns(tempSelectedColumns);
    }
   
  }

  useEffect(() => {
    handleSelectAll();
  }, [isExpanded]); 

  const handleSubmit = useCallback(() => {
    setSelectedColumns(tempSelectedColumns);
    handleModalClose();
  }, [tempSelectedColumns, handleModalClose]);

  const options = useMemo(
    () => ({
      responsive: "vertical",
      selectableRows: checkBox ? "single" : "none",
      onRowSelectionChange: (currentRowsSelected, allRowsSelected) => {
        if (allRowsSelected.length > 0) {
          const selectedIndex = allRowsSelected[0].index;
          const rowData = data[selectedIndex];
          setSelectedRowData(rowData);
          if (onRowSelect) onRowSelect(rowData);
          setCheckedRows(allRowsSelected.map((row) => row.index)); // Update checked rows state
        } else {
          setSelectedRowData(null);
          if (onRowSelect) onRowSelect(null);
          setCheckedRows([]); // Reset checked rows
        }
      },
      rowsSelected: checkedRows, // Manage the selected rows directly from local state
      download: false,
      print: false,
      viewColumns: false,
      search: false,
      filter: false,
      sort: false,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 25, 50, 100],
      fixedHeader: true,
      // tableBodyHeight: "320px",
      tableBodyMaxHeight: "320px",
      setCellProps: () => ({
        style: { textAlign: "center" },
      }),
      setRowProps: (row, dataIndex) => {
        return {
          style: {
            backgroundColor: dataIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Even rows: light gray, Odd rows: white
            transition: "background-color 0.3s ease",
            cursor: "pointer",
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "#d1e7ff"; // Light blue hover
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor =
              dataIndex % 2 === 0 ? "#f9f9f9" : "#ffffff"; // Reset to zebra striping
          },
        };
      },
    }),
    [data, selectedRowData, onRowSelect, checkBox, checkedRows]
  );

  const visibleColumns = useMemo(
    () =>
      selectedColumns.concat({
        name: "Action",
        label: (
          <>
            <button
            
              onClick={(e) => {
                e.stopPropagation();
                handleModalOpen();
              }}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                marginRight: "10px",
                cursor: "pointer",
              }}>
              {">"}
            </button>

            <button
              
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded((prev) => !prev); // Safely toggle isExpanded
              }}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
              }}>
              {isExpanded === false ?  ">>" : "<<"}
            </button>
          </>
        ),
        options: {
          filter: false,
          sort: false,
          setCellProps: () => ({
            style: { textAlign: "center", minWidth: "120px" },
          }),
        },
      }),
    [selectedColumns, handleModalOpen]
  );

  const customizedColumns = useMemo(
    () =>
      visibleColumns.map((column) => ({
        ...column,
        options: {
          ...column.options,
          sort: false,
          setCellProps: () => ({
            style: { width: column.width || "auto", minWidth: "100px" },
          }),
          setHeaderProps: () => ({
            style: {
              pointerEvents: column.name === "Action" ? "auto" : "none",
              cursor: column.name === "Action" ? "pointer" : "default",
            },
          }),
        },
      })),
    [visibleColumns]
  );

  const handleSelectAllChange = useCallback(() => {
    if (tempSelectedColumns.length === columns.length) {
      setTempSelectedColumns(columns.slice(0, 6)); // Adjust default columns here
    } else {
      setTempSelectedColumns(columns);
    }
  }, [columns, tempSelectedColumns]);
  useEffect(() => {
    // Update the checked rows when `isChecked` prop changes
    if (isChecked !== undefined) {
      setCheckedRows([isChecked]);
    }
  }, [isChecked]);
  return (
    <div className="modal-body">
      <div
        className="table-container"
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}>
        <MUIDataTable
          title={""}
          data={data}
          columns={customizedColumns}
          options={options}
        />
      </div>
      <Modal
        show={isModalOpen}
        onHide={handleModalClose}
        className="custom-modal">
        <Modal.Header className="card-bg-color" closeButton>
          <Modal.Title>Select Columns to Display</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 mb-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="select-all"
                  checked={tempSelectedColumns.length === columns.length}
                  onChange={handleSelectAllChange}
                />
                <label htmlFor="select-all" className="cursor-pointer">
                  Select All
                </label>
              </div>
            </div>

            <div className="col-6">
              {columns.slice(0, Math.ceil(columns.length / 2)).map((column) => (
                <div key={column.name} className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`column-${column.name}`}
                    checked={tempSelectedColumns.some(
                      (col) => col.name === column.name
                    )}
                    onChange={() => handleColumnChange(column.name)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`column-${column.name}`}>
                    {column.label || column.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="col-6">
              {columns.slice(Math.ceil(columns.length / 2)).map((column) => (
                <div key={column.name} className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`column-${column.name}`}
                    checked={tempSelectedColumns.some(
                      (col) => col.name === column.name
                    )}
                    onChange={() => handleColumnChange(column.name)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`column-${column.name}`}>
                    {column.label || column.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
            }}
            onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
            }}
            onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FullDataTable;
