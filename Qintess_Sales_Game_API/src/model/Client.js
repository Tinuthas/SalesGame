const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  
    return Client;
};
