const db = require("../model");
const User = db.users;
const Op = db.Sequelize.Op;

module.exports = {

    store(req, res) {
        try{
            var {username, password} = req.body
            if(username == null || password == null){
                res.status(400).json({message: 'Credênciais invalidas'})
            } 
            
            User.findOne({where: {username: req.body.username}}).then(data => {
                console.log(data)
                if(data == null)
                    res.status(400).json({message: 'User don\'t found'});
                else
                    res.status(200).json(data);
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