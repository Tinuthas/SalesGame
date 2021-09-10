const db = require("../model");
const Client = db.clients;
const Op = db.Sequelize.Op;

module.exports = {

    index(req, res) {
        try{
            Client.findAll()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving tutorials."
                });
            });
        }catch(err){
            return res.status(400).json({message: err.message})
        }
        
    },

    store(req, res) {
        try{
            
            const client = {
                name: req.body.name,
            };
            Client.create(client)
                .then(data => {
                    console.log(data)
                    res.status(201).json(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while creating the Tutorial."
                    });
                });
        }catch(err){
            return res.status(400).json({message: err.message})
        }
    },
}