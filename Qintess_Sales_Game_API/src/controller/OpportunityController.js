const db = require("../model");
const Opportunity = db.opportunities;
const User = db.users;
const Client = db.clients;
const Point = db.points
const Op = db.Sequelize.Op;
const QueryTypes = db.Sequelize.QueryTypes

module.exports = {

    async index(req, res) {
        try{
            /*Opportunity.findAll({ 
            order: [
                ['date', 'DESC'],
            ],
            include: [ Opportunity.Client, Opportunity.User] })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving tutorials."
                });
            });*/

            var opportunities = await db.sequelize.query(
                'SELECT o.*, u.name as "user.name", c.name as "client.name", SUM(p."number") as points '+
                'FROM "opportunities" o INNER JOIN "users" u ON o."userId" = u."id" '+
                'INNER JOIN "clients" c ON o."clientId" = c."id" '+
                'RIGHT JOIN "points" p ON o."id" = p."opportunityId" '+
                'GROUP BY o.id, u.name, c.name ORDER BY date DESC',
                {
                    //replacements: { status: 'active' },
                    nest: true,
                    type: QueryTypes.SELECT
                }
            )
            res.json(opportunities);

        }catch(err){
            return res.status(400).json({message: err.message})
        }
        
    },

    async store(req, res) {
        try{
            const{user} = req.headers
            const loggedUser = await User.findByPk(user)

            if(loggedUser == null) {
                return res.status(400).json({message: 'User don\'t found'})
            }
            const nameClient = req.body.client.name

            var client = await Client.findOne({
                where: { name: nameClient },
            })
            
            var opportunity = {
                nameProject: req.body.nameProject,
                description: req.body.description,
                email: req.body.email,
                fone: req.body.fone,
                date: new Date(),
                userId: loggedUser.id
            };
            if(client != null){
                opportunity.clientId= client.id
            }else{
                opportunity.client= { name: nameClient}
            }
            var opportunity = await Opportunity.create(opportunity, {
                include: [{
                    association: Opportunity.Client,
                }]
            })

            var point = await Point.create({
                type: 'C',
                date: new Date(),
                number: 20,
                opportunityId: opportunity.id
            })

            opportunity.dataValues.point = point

            res.json(opportunity)
              
        }catch(err){
            return res.status(400).json({message: err.message})
        }
    },
    
    async listUser(req, res) {
        try{
            const{user} = req.headers
            /*await Opportunity.findAll({where: {userId: user}, order: [
                ['date', 'DESC'],
            ],include: [Opportunity.Client, Opportunity.User]})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving tutorials."
                });
            });*/
            var opportunities = await db.sequelize.query(
                'SELECT o.*, u.name as "user.name", c.name as "client.name", SUM(p."number") as points '+
                'FROM "opportunities" o INNER JOIN "users" u ON o."userId" = u."id" '+
                'INNER JOIN "clients" c ON o."clientId" = c."id" '+
                'RIGHT JOIN "points" p ON o."id" = p."opportunityId" '+
                'WHERE o."userId" = :user ' +
                'GROUP BY o.id, u.name, c.name ORDER BY date DESC',
                {
                    replacements: { user: user },
                    nest: true,
                    type: QueryTypes.SELECT
                }
            )
            res.json(opportunities);
        }catch(err){
            return res.status(400).json({message: err.message})
        }
        
    },
}