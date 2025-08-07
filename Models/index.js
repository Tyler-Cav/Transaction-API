const Client = require("./Client");
const Transaction = require("./Transaction");

Client.hasMany(Transaction, {
  foreignKey: "client_id",
  as: "transactions",
});

Transaction.belongsTo(Client, {
  foreignKey: "client_id",
  as: "client",
});

module.exports = {
  Client,
  Transaction,
};
