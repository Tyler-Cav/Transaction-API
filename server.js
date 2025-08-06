const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize, testConnection } = require("./db-connect");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(JSON.stringify("Checking endpoint"));
});

const startServer = async () => {
  try {
    await testConnection();
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
