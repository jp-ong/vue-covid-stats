const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.json());

const connectDB = require("./config/db");
connectDB();

app.use("/api/stats", require("./routes/api/stats"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server on port ${port}...`));
