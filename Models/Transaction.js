const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db-connect");

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    timestamps: false, // Disable createdAt and updatedAt
  }
);

module.exports = Transaction;
