const express = require("express");
const api = require("./api");
const areaApi = require("./area");
const cors = require("cors");
const Pusher = require("pusher");
const path = require("path");

function init() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const pusher = new Pusher({
    appId: "1143545",
    key: "c55c11964c6fa4b839b9",
    secret: "bce6f540372792bc2aa9",
    cluster: "ap2",
    encrypted: true,
  });

  const PORT = process.env.PORT || 5000;

  app.get("/getLastPositionFromVF/:mmsi", (req, res) => {
    api.getLocationFromVF(req.params.mmsi, (result) => {
      res.send(result);
    });
  });

  app.get("/getLastPositionFromMT/:mmsi", (req, res) => {
    api.getLocationFromMT(req.params.mmsi, (result) => {
      res.send(result);
    });
  });

  app.get("/getLastPosition/:mmsi", (req, res) => {
    api.getLocation(req.params.mmsi, (result) => {
      res.send(result);
    });
  });

  app.get("/getMoreDetails/:mmsi", (req, res) => {
    api.getMoreDetails(req.params.mmsi, (result) => {
      res.send(result);
    });
  });

  // e.g. /getVesselsInArea/WMED,EMED
  app.get("/getVesselsInArea/:area", async (req, res) => {
    const fetchedData = await areaApi.fetchVesselsInArea(
      req.params.area.split(","),
      (result) => {
        res.json(result);
      }
    );
  });

  app.post("/triggerAlert", (req, res) => {
    pusher.trigger("alerts", "push", {
      type: req.body.type,
      message: req.body.message,
      val: req.body.val,
      fieldKey: req.body.fieldKey,
      fieldValue: req.body.fieldValue,
    });

    res.send({ message: "success" });
  });

  //heroku
  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function (_req, res) {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
  }

  app.listen(PORT, function () {
    console.log("Server running on port", PORT);
  });
}

module.exports = {
  init: init,
};
