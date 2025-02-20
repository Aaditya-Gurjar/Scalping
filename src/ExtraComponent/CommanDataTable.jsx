
// ___________Updated table ____________

import React, { useState, useCallback, useMemo, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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

let Theme = localStorage.getItem("theme");

  useEffect(() => {
    setSelectedColumns(columns.slice(0, 7)); // Reset selected columns to default
    setTempSelectedColumns(columns.slice(0, 7)); // Reset temp selected columns
  }, [columns]);

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
      rowsPerPageOptions: [10, 25, 50, 100],
      setCellProps: () => ({
        style: { textAlign: "center" },
      }),
      setRowProps: (row, dataIndex) => {
        return {
          style: {
            // backgroundColor: dataIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", 
            backgroundColor: Theme == "light" ? (dataIndex % 2 === 0 ? "#f9f9f9" : "#ffffff") : (dataIndex % 2 === 0 ? "#333" : "#000"), 

            transition: "background-color 0.3s ease",
            cursor: "pointer",
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = Theme == "light" ? "#f0f0f0" : "#666"; 
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor =Theme == "light" ? (dataIndex % 2 === 0 ? "#f9f9f9" : "#ffffff") : (dataIndex % 2 === 0 ? "#333" : "#000"); 
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
          <button
            onClick={handleModalOpen}
            style={{
              backgroundColor: Theme == "light" ? "#007bff" : "#333",
              color: Theme == "light" ? "#fff" : "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "5px 10px",
              cursor: "pointer",
            }}>
            {">>"}
          </button>
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
    if (isChecked !== undefined) {
      setCheckedRows([isChecked]);
    }
  }, [isChecked]);
  return (
    <>
      <div
        // className="table-container"
        // style={{
        //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        //   border: "1px solid #ddd",
        //   borderRadius: "8px",
        //   overflow: "hidden",
        // }}
        >
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
        <Modal.Header closeButton>
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
                <label className="form-check-label" htmlFor="select-all">
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
              backgroundColor: "red",
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
    </>
  );
};

export default FullDataTable;
