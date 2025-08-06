const router = require("express").Router();
const { Client, Transaction } = require("../Models");

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: Client,
          as: "client",
          attributes: {
            exclude: ["client_id"],
          },
        },
      ],
      attributes: {
        exclude: ["client_id"],
      },
    });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/signed-in", async (req, res) => {
  const { client_id } = req.query;

  try {
    const clientWithTransactions = await Client.findOne({
      where: { id: client_id },
      attributes: {
        exclude: ["First_Name", "id", "Last_Name"],
      },
      include: [
        {
          model: Transaction,
          as: "transactions",
          attributes: {
            exclude: ["client_id", "id"],
          },
        },
      ],
    });

    let clientInfo = {
      maxWithdraw: 0,
      maxDeposit: 0,
      totalNet: 0,
    };

    //Check if transactions exist. If not, return an empty array
    const transactions = clientWithTransactions?.transactions || [];

    //Loop over transactions and compare against maxWithdraw/maxDeposit/totalNet
    for (let i = 0; i < transactions.length; i++) {
      let transactionValue = parseFloat(transactions[i].dataValues.transaction);
      if (transactionValue < 0) {
        if (transactionValue < clientInfo.maxWithdraw) {
          clientInfo.maxWithdraw = transactionValue;
        }
      } else {
        if (transactionValue > clientInfo.maxDeposit) {
          clientInfo.maxDeposit = transactionValue;
        }
      }
      clientInfo.totalNet += transactionValue;
    }
    //return the clientInfo object to the frontend with only the necessary data.
    res.json({ clientInfo });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
