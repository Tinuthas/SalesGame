const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Point = sequelize.define("points", {
      type: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      number: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
    });
  
    return Point;
};
