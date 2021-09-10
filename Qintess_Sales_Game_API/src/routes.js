const { Router } = require('express')
const express = require('express')

const UserController = require('./controller/UserController')
const LoginController = require('./controller/LoginController')
const ClientController = require('./controller/ClientController')
const OpportunityController = require('./controller/OpportunityController')
const PointController = require('./controller/PointController')
const LikeController = require('./controller/LikeController')
const RankController = require('./controller/RankController')
const MainController = require('./controller/MainController')

const routes = express.Router()


routes.get('/test', (req, res) => { res.json({ message: "Test" })})
routes.post('/login', LoginController.store)
routes.post('/register', UserController.store)
routes.get('/users/all', UserController.index)
routes.get('/clients/all', ClientController.index)
routes.post('/clients', ClientController.store)
routes.get('/opportunities/all', OpportunityController.index)
routes.get('/opportunities/all/user', OpportunityController.listUser)
routes.post('/opportunities', OpportunityController.store)
routes.get('/points', PointController.index)
routes.post('/points', PointController.store)
routes.get('/likes', LikeController.index)
routes.post('/likes', LikeController.store)
routes.get('/likes/user', LikeController.listUser)
routes.get('/ranks', RankController.index)
routes.get('/ranks/month', RankController.month)
routes.get('/ranks/year', RankController.year)



module.exports = routes