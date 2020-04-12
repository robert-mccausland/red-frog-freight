const express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors')

const parcelHandler = require("./src/parcelHandler");
const parcelData = require("./src/parcelData");
const port = process.env.PORT || "8000";

const app = express();
app.use(cors());
app.use(bodyParser.json());
parcelHandler(app);

app.listen(parseInt(port));
parcelData.connect();
