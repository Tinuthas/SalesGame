const db = require("../model");
const Point = db.points;
const Op = db.Sequelize.Op;
const QueryTypes = db.Sequelize.QueryTypes;


module.exports = {

    async index(req, res) {
        try{
            const{user} = req.headers
            if(user == undefined) {
                const points = await db.sequelize.query(
                    'SELECT u.*, SUM(p."number") as points, RANK () OVER ( ORDER BY SUM(p."number") DESC ) as rank '+
                    'FROM "users" u INNER JOIN "opportunities" o ON o."userId" = u."id" '+
                    'RIGHT JOIN "points" p ON o."id" = p."opportunityId" '+
                    'GROUP BY u.id',
                {
                    //replacements: { status: 'active' },
                    type: QueryTypes.SELECT
                })
                return res.json(points)
            }else{
                console.log(user)
                if(user == '') {
                    return res.status(400).json({message: 'user don`t found'})
                }
                const points = await db.sequelize.query(
                    'SELECT u.* FROM ( ' +
                    'SELECT u.*, SUM(p."number") as points, RANK () OVER ( ORDER BY SUM(p."number") DESC ) as rank '+
                    'FROM "users" u INNER JOIN "opportunities" o ON o."userId" = u."id" '+
                    'RIGHT JOIN "points" p ON o."id" = p."opportunityId" '+
                    'GROUP BY u.id) as u '+
                    'WHERE  u.id = :user ',
                {
                    replacements: { user: parseInt(user) },
                    type: QueryTypes.SELECT
                })
                return res.json(points)
            }
            
        }catch(err){
            return res.status(400).json({message: err.message})
        }
        
    },

    async month(req, res) {
        try{
            const{year, month} = req.headers
            if(year == undefined || month == undefined || year == '' || month == '')
                return res.status(400).json({message: 'don`t found year and month'})
            const points = await db.sequelize.query(
                'SELECT u.* ,SUM(p."number") as points, RANK () OVER ( ORDER BY SUM(p."number") DESC ) as rank '+
                'FROM "users" u INNER JOIN "opportunities" o ON o."userId" = u."id" '+
                'RIGHT JOIN "points" p ON o."id" = p."opportunityId" '+
                'WHERE DATE_PART(\'year\', p.date) = :year AND ' +
                'DATE_PART(\'month\', p.date) = :month ' +
                'GROUP BY u.id',
            {
                replacements: { year: year, month: month},
                type: QueryTypes.SELECT
            })
            return res.json(points)
            
            
        }catch(err){
            return res.status(400).json({message: err.message})
        }
        
    },

    async year(req, res) {
        try{
            const{year} = req.headers
            if(year == undefined || year == '' )
                return res.status(400).json({message: 'don`t found year'})
            const points = await db.sequelize.query(
                'SELECT u.* ,SUM(p."number") as points, RANK () OVER ( ORDER BY SUM(p."number") DESC ) as rank '+
                'FROM "users" u INNER JOIN "opportunities" o ON o."userId" = u."id" '+
                'RIGHT JOIN "points" p ON o."id" = p."opportunityId" '+
                'WHERE DATE_PART(\'year\', p.date) = :year ' +
                'GROUP BY u.id',
            {
                replacements: { year: year},
                type: QueryTypes.SELECT
            })
            return res.json(points)
            
            
        }catch(err){
            return res.status(400).json({message: err.message})
        }
        
    }
}