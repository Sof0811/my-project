import { useState } from "react";
import DataTableExample from "./Component/DataTable.jsx";

const App = () => {
  const requestTypeOption = [
    {
      name: "POST",
      value: 0,
    },
    {
      name: "GET",
      value: 1,
    },
  ];

  const [details, setDetails] = useState({
    method: "GET",
    url: "",
  });

  const handleDetails = (data) => {
    const { name, value } = data; //this data is used to having the data
    setDetails((prevDetails) => {
      prevDetails[name] = value;
      return { ...prevDetails };
    });
  };
  const isUrlValid = (str) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );
    return pattern.test(str);
  };
  const handleInputUrlValidation = () => {};

  const [tableData, setTableData] = useState([
    { key: "", value: "", description: "" },
  ]);

  const handleSend = () => {
    console.log("details", details);
    console.log(tableData);
  };

  return (
    <>
      <div className="Header">
        <div className="heading">
          <h1>Postman - Analytic Brains</h1>
        </div>
        <div>
          <p>{details.url}</p>
        </div>

        <div className="input-fiels">
          <select
            value={details.method}
            className="dropDownOption"
            onChange={(event) => {
              handleDetails({ name: "method", value: event.target.value });
            }}
          >
            {requestTypeOption.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter URL or Paste text"
            value={details.url}
            className="input-box"
            onChange={(event) => {
              handleDetails({ name: "url", value: event.target.value });
            }}
          />
          <button onClick={handleSend} className="send-button">
            <b>Send</b>
          </button>
        </div>
      </div>
      <DataTableExample tableData={tableData} setTableData={setTableData} />
    </>
  );
};

export default App;
