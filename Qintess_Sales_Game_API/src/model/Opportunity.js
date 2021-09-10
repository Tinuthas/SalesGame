const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Opportunity = sequelize.define("opportunities", {
      nameProject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      fone: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    });
  
    return Opportunity;
};