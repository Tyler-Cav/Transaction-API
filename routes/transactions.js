const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("This is the transactions root");
});

module.exports = router;
