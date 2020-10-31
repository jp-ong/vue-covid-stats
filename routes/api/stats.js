const express = require("express");
const router = express.Router();

const Stat = require("../../models/Stat");

router.get("/", (req, res) => {
  Stat.find().then((stats) => {
    if (stats.length === 0)
      return res.status(404).json({ msg: "Database is empty." });
    return res.status(200).json({ results: stats.length, stats });
  });
});

router.get("/latest/:days", (req, res) => {
  const date = new Date(
    new Date(
      new Date().setDate(new Date().getDate() - req.params.days)
    ).setUTCHours(0, 0, 0, 0)
  );
  Stat.find({ $and: [{ date }, { population: { $ne: undefined } }] })
    .sort({ country: 1 })
    .then((stats) => {
      if (stats.length === 0)
        return res.status(404).json({ msg: "No data found for this day." });
      return res.status(200).json({ results: stats.length, stats });
    });
});

router.get("/country/:country", (req, res) => {
  Stat.find({ country: req.params.country })
    .sort({ date: -1 })
    .then((stats) => {
      if (stats.length === 0)
        return res
          .status(404)
          .json({ msg: `No data found for ${req.params.country}` });
      res.status(200).json({ results: stats.length, stats });
    });
});

module.exports = router;
