const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const PORT = 4001;

app.use(bodyParser.json({ limit: `10mb` }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

//sample client data
const requestdata = {
  "method": "GET",
  "url": "https://valurite.atlassian.net/browse/SU-323",
  "data": [
    {
      "Name": "Juan",
      "age": 34
    },
    {
      "Name": "Gopal",
      "age": 23
    }
  ]
}

// Function to extract ID from URL
function extractIdFromURL(url) {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

// Route to perform dynamic API requests
app.all("/api/request", async (req, res) => {
  try {
    console.log("Response got");

    const { method, url, data } = req.body;

    let requestURL = url;

    // Extracting ID from URL for PUT and DELETE methods
    if ((method === "PUT" || method === "DELETE") && url.includes("posts")) {
      const baseUrl = url.substring(0, url.lastIndexOf("/")); // Extract base URL
      const id = extractIdFromURL(url); // Extract ID
      requestURL = `${baseUrl}/${id}`;
    }

    let response;

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

    console.log("Response:", response);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
