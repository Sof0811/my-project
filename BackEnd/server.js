const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const PORT = 4001;
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json({ limit: `10mb` }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Function to extract ID from URL
function extractIdFromURL(url) {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

// Route to perform dynamic API requests
app.all("/api/request", async (req, res) => {
  try {
    const { method, url, data } = req.query;

    let requestURL = url, response;

    if ((method === "PUT" || method === "DELETE") && url.includes("posts")) {
      const baseUrl = url.substring(0, url.lastIndexOf("/")), id = extractIdFromURL(url);
      requestURL = `${baseUrl}/${id}`;
    }



    if (method === "GET") {
      response = await axios.get(requestURL);
    } else if (method === "POST") {
      response = await axios.post(requestURL, data);
    } else if (method === "PUT") {
      response = await axios.put(requestURL, data);
    } else if (method === "DELETE") {
      response = await axios.delete(requestURL);
    } else {
      throw new Error("Invalid method");
    }

    if (!response.status === 200) {
      throw new Error("Request failed");
    }

    // console.log("Response:", response);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
