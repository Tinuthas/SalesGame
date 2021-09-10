const db = require("../model");
const Like = db.likes;
const Opportunity = db.opportunities;
const Op = db.Sequelize.Op;
const QueryTypes = db.Sequelize.QueryTypes;

module.exports = {

    async index(req, res) {
        try{
            const{user} = req.headers
            // 
            var likes = await db.sequelize.query(
                'SELECT o.id, COUNT(l.id) as likes, COUNT(lu.id) as liked '+
                'FROM "opportunities" o ' +
                'LEFT JOIN "likes" l ON o."id" = l."opportunityId" '+
                'LEFT JOIN "likes" lu ON o."id" = lu."opportunityId" AND lu."userId" = :user '+
                'GROUP BY o.id ORDER BY o.date DESC',
                {
                    replacements: { user: user },
                    nest: true,
                    type: QueryTypes.SELECT
                }
            )
            res.json(likes);
        }catch(err){
            return res.status(400).json({message: err.message})
        }
        
    },

    async store(req, res) {
        try{
            console.log(req.headers)
            const{user, opportunity} = req.headers
           console.log(user, opportunity)
            var like = await Like.findOne({ where: { userId: user, opportunityId: opportunity } });
            if (like === null) {
                like = await Like.create({
                    userId: user, 
                    opportunityId: opportunity
                })
            } else {
                await Like.destroy({
                    where: {
                        id: like.id
                    }
                })
            }
            res.json(like)
        }catch(err){
            console.log(err)
            return res.status(400).json({message: err.message})
        }
    },

    async listUser(req, res) {
        try{
            const{user} = req.headers
            var likes = await db.sequelize.query(
                'SELECT o.id, COUNT(l.id) as likes, COUNT(lu.id) as liked '+
                'FROM "opportunities" o ' +
                'LEFT JOIN "likes" l ON o."id" = l."opportunityId" '+
                'LEFT JOIN "likes" lu ON o."id" = lu."opportunityId" AND lu."userId" = :user '+
                'WHERE o."userId" = :user ' +
                'GROUP BY o.id ORDER BY o.date DESC',
                {
                    replacements: { user: user },
                    nest: true,
                    type: QueryTypes.SELECT
                }
            )
            res.json(likes);
        }catch(err){
            return res.status(400).json({message: err.message})
        }
        
    },
}