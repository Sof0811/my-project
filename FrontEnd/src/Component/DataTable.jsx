import React, { useState } from "react";
import "./DataTable.css"; // Import CSS file

const DataTableExample = ({ tableData = [], setTableData = () => {} }) => {
  // State to store table data

  // Function to handle updating table data
  const handleTableDataChange = (index, key, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index][key] = value;
    setTableData(updatedTableData);

    // Check if both key and value are empty, then remove the row
    if (
      updatedTableData[index].key === "" &&
      updatedTableData[index].value === "" &&
      index !== updatedTableData.length - 1 // Check if not the last row
    ) {
      updatedTableData.splice(index, 1);
      setTableData(updatedTableData);
    }

    // Check if the last row is filled with data and add a new row if needed
    const lastRow = updatedTableData[updatedTableData.length - 1];
    if (lastRow.key !== "" && lastRow.value !== "") {
      setTableData([
        ...updatedTableData,
        { key: "", value: "", description: "" },
      ]);
    }
  };

  return (
    <div className="">
      <div className="row">
        <div className="col">
          <table className="table-container">
            <thead>
              <tr>
                <th scope="col">Key</th>
                <th scope="col">Value</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Key"
                      value={row.key}
                      onChange={(e) =>
                        handleTableDataChange(index, "key", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Value"
                      value={row.value}
                      onChange={(e) =>
                        handleTableDataChange(index, "value", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      value={row.description}
                      onChange={(e) =>
                        handleTableDataChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTableExample;
