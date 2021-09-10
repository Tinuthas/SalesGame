const db = require("../model");
const User = db.users;
const Client = db.clients;
const Op = db.Sequelize.Op;

module.exports = {

    index(req, res) {
        try{
            User.findAll()
            .then(data => {
                if(data == null)
                    res.status(400).json({message: 'Users don\'t found'});
                else
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

    async store(req, res) {
        try{

            const nameClient = req.body.client.name

            var client = await Client.findOne({
                where: { name: nameClient },
            })

            const user = {
                name: req.body.name,
                email: req.body.email,
                username:  req.body.username,
                type: req.body.type,
            };
            
            if(client != null){
                user.clientId= client.id
            }else{
                user.client= { name: nameClient}
            }
            
           
            await User.create(user, {
                include: [{
                    association: User.Client,
                }]
            }).then(data => {
                console.log(data)
                res.status(201).json(data);
            }).catch(err => {
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