const db = require("../model");
const Point = db.points;
const Op = db.Sequelize.Op;

module.exports = {

    index(req, res) {
        try{
            const{opportunity} = req.headers
            Point.findAll({where: {opportunityId: opportunity}, order: [
                ['date', 'ASC'],
            ]})
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
            const{opportunity} = req.headers
            const point = {
                type: req.body.type,
                date: new Date(),
                number: req.body.number,
                opportunityId: opportunity
            };
            Point.create(point)
                .then(data => {
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

    async rank(req, res) {
        try{
            await db.sequelize.query('SELECT *, RANK () OVER ( ORDER BY number DESC ) rank_number FROM points',
            {
                //replacements: { status: 'active' },
                type: QueryTypes.SELECT
            })
            .then(data => {
                res.json(data)
            })
           
        }catch(err){
            return res.status(400).json({message: err.message})
        }
    }
}