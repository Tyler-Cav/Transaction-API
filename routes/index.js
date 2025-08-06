const router = require("express").Router();
const transactionsRoutes = require("./transactions");

router.use("/transactions", transactionsRoutes);

router.use("/", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = router;
