

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import MUIDataTable from "mui-datatables";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { FiMaximize, FiMinimize } from "react-icons/fi";
// import { FiCheckCircle } from "react-icons/fi";
// import { RiExpandRightFill } from "react-icons/ri";
// import { RiExpandLeftFill } from "react-icons/ri";

// const FullDataTable = ({ data, columns, onRowSelect, checkBox, isChecked }) => {
//   // initial display: collapsed = showing only 6 columns (or adjust as needed)
//   const [selectedColumns, setSelectedColumns] = useState(columns.slice(0, 6));
//   const [tempSelectedColumns, setTempSelectedColumns] = useState(
//     columns.slice(0, 6)
//   );
//   const [checkedRows, setCheckedRows] = useState(
//     isChecked !== undefined ? [isChecked] : []
//   );
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // New state to control expanded/collapsed columns
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     // Whenever columns change, update the default collapsed view
//     setSelectedColumns(columns.slice(0, 6));
//     setTempSelectedColumns(columns.slice(0, 6));
//   }, [columns]);

//   // Toggle handler for expanding/collapsing columns
//   const handleToggleColumns = useCallback(() => {
//     if (isExpanded) {
//       // Collapse: show only the first 6 columns
//       setSelectedColumns(columns.slice(0, 6));
//       setTempSelectedColumns(columns.slice(0, 6));
//     } else {
//       // Expand: show all columns
//       setSelectedColumns(columns);
//       setTempSelectedColumns(columns);
//     }
//     setIsExpanded((prev) => !prev);
//   }, [isExpanded, columns]);

//   // Memoized modal handlers
//   const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
//   const handleModalClose = useCallback(() => setIsModalOpen(false), []);

//   const handleColumnChange = useCallback(
//     (columnName) => {
//       const columnToAdd = columns.find((col) => col.name === columnName);
//       if (tempSelectedColumns.some((col) => col.name === columnName)) {
//         setTempSelectedColumns((prev) =>
//           prev.filter((col) => col.name !== columnName)
//         );
//       } else if (columnToAdd) {
//         setTempSelectedColumns((prev) => [...prev, columnToAdd]);
//       }
//     },
//     [columns, tempSelectedColumns]
//   );

//   const handleSubmit = useCallback(() => {
//     setSelectedColumns(tempSelectedColumns);
//     handleModalClose();
//   }, [tempSelectedColumns, handleModalClose]);

//   const options = useMemo(
//     () => ({
//       responsive: "vertical",
//       selectableRows: checkBox ? "single" : "none",
//       onRowSelectionChange: (currentRowsSelected, allRowsSelected) => {
//         if (allRowsSelected.length > 0) {
//           const selectedIndex = allRowsSelected[0].index;
//           const rowData = data[selectedIndex];
//           if (onRowSelect) onRowSelect(rowData);
//           setCheckedRows(allRowsSelected.map((row) => row.index));
//         } else {
//           if (onRowSelect) onRowSelect(null);
//           setCheckedRows([]);
//         }
//       },
//       rowsSelected: checkedRows,
//       download: false,
//       print: false,
//       viewColumns: false,
//       search: false,
//       filter: false,
//       sort: false,
//       rowsPerPage: 5,
//       rowsPerPageOptions: [5, 10, 25, 50, 100],
//       fixedHeader: true,
//       tableBodyMaxHeight: "320px",
//       setCellProps: () => ({
//         style: { textAlign: "center" },
//       }),
//       setRowProps: (row, dataIndex) => ({
//         style: {
//           backgroundColor: dataIndex % 2 === 0 ? "#f9f9f9" : "#ffffff",
//           transition: "background-color 0.3s ease",
//           cursor: "pointer",
//         },
//         onMouseEnter: (e) => {
//           e.currentTarget.style.backgroundColor = "#d1e7ff";
//         },
//         onMouseLeave: (e) => {
//           e.currentTarget.style.backgroundColor =
//             dataIndex % 2 === 0 ? "#f9f9f9" : "#ffffff";
//         },
//       }),
//     }),
//     [data, onRowSelect, checkBox, checkedRows]
//   );

//   const visibleColumns = useMemo(
//     () =>
//       selectedColumns.concat(
//         {
//           name: "Action1",
//           label: (
//             <button
//               onClick={handleModalOpen}
//               style={{
//                 backgroundColor: "#000",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "4px",
//                 padding: "5px 10px",
//                 cursor: "pointer",
//               }}>
//               {<FiCheckCircle />}
//             </button>
//           ),
//           options: {
//             filter: false,
//             sort: false,
//             setCellProps: () => ({
//               style: { textAlign: "center", minWidth: "120px" },
//             }),
//           },
//         },
//         {
//           name: "Action2",
//           label: (
//             <Button className="toggle-button" onClick={handleToggleColumns}>
//               {isExpanded ? <RiExpandLeftFill /> : <RiExpandRightFill />}
//               <span style={{ marginLeft: "6px" }}>{isExpanded ? "" : ""}</span>
//             </Button>
//           ),
//           options: {
//             filter: false,
//             sort: false,
//             setCellProps: () => ({
//               style: { textAlign: "center", minWidth: "120px" },
//             }),
//           },
//         }
//       ),
//     [selectedColumns, handleModalOpen, handleToggleColumns, isExpanded]
//   );

//   const customizedColumns = useMemo(
//     () =>
//       visibleColumns.map((column) => ({
//         ...column,
//         options: {
//           ...column.options,
//           sort: false,
//           setCellProps: () => ({
//             style: { width: column.width || "auto", minWidth: "100px" },
//           }),
//           setHeaderProps: () => ({
//             style: {
//               pointerEvents: column.name === "Action" ? "auto" : "none",
//               cursor: column.name === "Action" ? "pointer" : "default",
//             },
//           }),
//         },
//       })),
//     [visibleColumns]
//   );

//   const handleSelectAllChange = useCallback(() => {
//     if (tempSelectedColumns.length === columns.length) {
//       setTempSelectedColumns(columns.slice(0, 6)); // Collapsed view: only first 6 columns
//     } else {
//       setTempSelectedColumns(columns);
//     }
//   }, [columns, tempSelectedColumns]);

//   useEffect(() => {
//     if (isChecked !== undefined) {
//       setCheckedRows([isChecked]);
//     }
//   }, [isChecked]);

//   return (
//     <div className="modal-body">
//       {/* New toggle button for expanding/collapsing columns */}

//       <div
//         className="table-container"
//         style={{
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           overflow: "hidden",
//         }}>
//         <MUIDataTable
//           title={""}
//           data={data}
//           columns={customizedColumns}
//           options={options}
//         />
//       </div>
//       <Modal
//         show={isModalOpen}
//         onHide={handleModalClose}
//         className="custom-modal">
//         <Modal.Header className="card-bg-color" closeButton>
//           <Modal.Title>Select Columns to Display</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="row">
//             <div className="col-12 mb-2">
//               <div className="form-check">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id="select-all"
//                   checked={tempSelectedColumns.length === columns.length}
//                   onChange={handleSelectAllChange}
//                 />
//                 <label htmlFor="select-all" className="cursor-pointer">
//                   Select All
//                 </label>
//               </div>
//             </div>
//             <div className="col-6">
//               {columns.slice(0, Math.ceil(columns.length / 2)).map((column) => (
//                 <div key={column.name} className="form-check mb-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id={`column-${column.name}`}
//                     checked={tempSelectedColumns.some(
//                       (col) => col.name === column.name
//                     )}
//                     onChange={() => handleColumnChange(column.name)}
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor={`column-${column.name}`}>
//                     {column.label || column.name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             <div className="col-6">
//               {columns.slice(Math.ceil(columns.length / 2)).map((column) => (
//                 <div key={column.name} className="form-check mb-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id={`column-${column.name}`}
//                     checked={tempSelectedColumns.some(
//                       (col) => col.name === column.name
//                     )}
//                     onChange={() => handleColumnChange(column.name)}
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor={`column-${column.name}`}>
//                     {column.label || column.name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             style={{
//               backgroundColor: "black",
//               color: "white",
//               border: "none",
//             }}
//             onClick={handleModalClose}>
//             Cancel
//           </Button>
//           <Button
//             style={{
//               backgroundColor: "green",
//               color: "white",
//               border: "none",
//             }}
//             onClick={handleSubmit}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default FullDataTable;

import React, { useState, useCallback, useMemo, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const FullDataTable = ({ data, columns, onRowSelect, checkBox, isChecked, showIsExpandable = true, FixedRowPerPage }) => {
  const [selectedColumns, setSelectedColumns] = useState(columns?.slice(0, 7) || []);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedColumns, setTempSelectedColumns] = useState(columns?.slice(0, 7) || []);
  const [checkedRows, setCheckedRows] = useState(isChecked !== undefined ? [isChecked] : []);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setSelectedColumns(columns.slice(0, 7));
    setTempSelectedColumns(columns.slice(0, 7));
  }, [columns]);

  // Modal handlers
  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  // Handle column selection in modal
  const handleColumnChange = useCallback(
    (columnName) => {
      const columnToAdd = columns.find((col) => col.name === columnName);
      if (tempSelectedColumns.some((col) => col.name === columnName)) {
        setTempSelectedColumns((prev) => prev.filter((col) => col.name !== columnName));
      } else if (columnToAdd) {
        setTempSelectedColumns((prev) => [...prev, columnToAdd]);
      }
    },
    [columns, tempSelectedColumns]
  );

  // Submit selected columns from modal
  const handleSubmit = useCallback(() => {
    setSelectedColumns(tempSelectedColumns);
    setIsExpanded(false); // Collapse table after submitting
    handleModalClose();
  }, [tempSelectedColumns, handleModalClose]);

  // Toggle expand/collapse
  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => {
      if (!prev) {
        setSelectedColumns(columns); // Show all columns when expanding
      } else {
        setSelectedColumns(tempSelectedColumns); // Revert to selected columns when collapsing
      }
      return !prev;
    });
  }, [columns, tempSelectedColumns]);

  // Table options
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
          setCheckedRows(allRowsSelected.map((row) => row.index));
        } else {
          setSelectedRowData(null);
          if (onRowSelect) onRowSelect(null);
          setCheckedRows([]);
        }
      },
      rowsSelected: checkedRows,
      download: false,
      print: false,
      viewColumns: false,
      search: false,
      filter: false,
      sort: false,
      rowsPerPage: FixedRowPerPage ? FixedRowPerPage : rowsPerPage,
      rowsPerPageOptions: [5, 10, 25, 50, 100],
      onChangeRowsPerPage: (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
      },
      fixedHeader: true,
      tableBodyMaxHeight: "auto",
      setCellProps: () => ({
        style: { textAlign: "center" },
      }),
      setRowProps: (row, dataIndex) => ({
        style: {
          backgroundColor: dataIndex % 2 === 0 ? "#f9f9f9" : "#ffffff",
          transition: "background-color 0.3s ease",
          cursor: "pointer",
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.backgroundColor = "#d1e7ff";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.backgroundColor = dataIndex % 2 === 0 ? "#f9f9f9" : "#ffffff";
        },
      }),
    }),
    [data, selectedRowData, onRowSelect, checkBox, checkedRows, rowsPerPage]
  );

  // Visible columns with action buttons
  const visibleColumns = useMemo(() => {
    const actionColumns = [];
    if (showIsExpandable) {
      actionColumns.push({
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
              }}
            >
              {">"}
            </button>
            <button
              onClick={toggleExpand}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              {isExpanded ? "<<" : ">>"}
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
      });
    }
    return selectedColumns.concat(actionColumns);
  }, [selectedColumns, handleModalOpen, isExpanded, toggleExpand, showIsExpandable]);

  // Customized columns for MUIDataTable
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

  // Handle "Select All" checkbox in modal
  const handleSelectAllChange = useCallback(() => {
    if (tempSelectedColumns.length === columns.length) {
      setTempSelectedColumns(columns.slice(0, 6)); // Default to first 6 columns
      setIsExpanded(false);
    } else {
      setTempSelectedColumns(columns); // Select all columns
    }
  }, [columns, tempSelectedColumns]);

  // Sync checked rows with isChecked prop
  useEffect(() => {
    if (typeof isChecked === 'function' && data?.length > 0) {
      const matchedIndexes = data
        .map((row, index) => (isChecked(row) ? index : -1))
        .filter((index) => index !== -1);
      setCheckedRows(matchedIndexes);
    } else if (typeof isChecked === 'number') {
      setCheckedRows([isChecked]);
    }
  }, [isChecked, data]);
  

  return (
    <div className="modal-body">
      <div
        className="table-container"
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <MUIDataTable
          title={""}
          data={data}
          columns={customizedColumns}
          options={options}
        />
      </div>
      <Modal show={isModalOpen} onHide={handleModalClose} className="custom-modal">
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
                    checked={tempSelectedColumns.some((col) => col.name === column.name)}
                    onChange={() => handleColumnChange(column.name)}
                  />
                  <label className="form-check-label" htmlFor={`column-${column.name}`}>
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
                    checked={tempSelectedColumns.some((col) => col.name === column.name)}
                    onChange={() => handleColumnChange(column.name)}
                  />
                  <label className="form-check-label" htmlFor={`column-${column.name}`}>
                    {column.label || column.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "black", color: "white", border: "none" }}
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "green", color: "white", border: "none" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FullDataTable;