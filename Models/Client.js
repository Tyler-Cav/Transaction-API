const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db-connect");

class Client extends Model {}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    First_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Last_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Client",
    timestamps: false,
  }
);

module.exports = Client;
