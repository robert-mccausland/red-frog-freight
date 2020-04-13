const express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors')

const parcelHandler = require("./src/parcelHandler");
const parcelData = require("./src/parcelData");
const port = process.env.PORT || "8000";
let server;
let stopping = false;

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("Starting app");
const app = express();
app.use(cors());
app.use(bodyParser.json());
parcelHandler(app);

(async function () {
    console.log("Connecting to database");
    await parcelData.connect();
    console.log("Starting web server");
    await new Promise(res => { server = app.listen(parseInt(port), res); });
    console.log("App started successfully");
}());


async function shutdown() {
    if (!stopping) {
        stopping = true;
        console.log("Shutting down");
        if (server) {
            await new Promise(res => { server.close(res); });
        }
        await parcelData.disconnect();
        console.log("Shut down successfully");
    }
}