const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
  },
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.users = require("./User.js")(sequelize, Sequelize);
db.clients = require("./Client.js")(sequelize, Sequelize);
db.opportunities = require("./Opportunity.js")(sequelize, Sequelize);
db.points = require("./Point.js")(sequelize, Sequelize);
db.likes = require("./Like.js")(sequelize, Sequelize);

//Associates

db.clients.hasMany(db.users)
db.users.Client = db.users.belongsTo(db.clients, {
    as: 'client',
    foreignKey: {
      allowNull: false
    }
})

db.clients.hasMany(db.opportunities)
db.opportunities.Client = db.opportunities.belongsTo(db.clients, {
    as: 'client',
    foreignKey: {
      allowNull: false
    }
})

db.users.hasMany(db.opportunities)
db.opportunities.User = db.opportunities.belongsTo(db.users, {
    as: 'user',
    foreignKey: {
      name: 'userId',
      allowNull: false
    }
})

db.opportunities.hasMany(db.points)
db.points.Opportunity = db.points.belongsTo(db.opportunities, {
  as: 'opportunity',
  foreignKey: {
    allowNull: false
  }
})

db.opportunities.hasMany(db.likes)
db.likes.Opportunity = db.likes.belongsTo(db.opportunities, {
  as: 'opportunity',
  foreignKey: {
    allowNull: false
  }
})

db.users.hasMany(db.likes)
db.likes.User = db.likes.belongsTo(db.users, {
  as: 'user',
  foreignKey: {
    allowNull: false
  }
})

module.exports = db;