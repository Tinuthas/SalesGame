const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const PORT = process.env.PORT || 3333;

const db = require("./model");
const app = express()

db.sequelize.sync();

/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});*/


app.use(cors())
app.use(express.json())
app.use(routes)
  
app.listen(PORT);