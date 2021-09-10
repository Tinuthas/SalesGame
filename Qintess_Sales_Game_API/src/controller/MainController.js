
module.exports = {

    listOpp(req, res) {
        console.log(req.body)
        //var {username, password} = req.body
        
        console.log('test')
        return res.json([{id:1,
            name: 'Bruno Berti',
            nameProject: 'Santander Monitoração',
            description: 'Monitoração de aplicativos mobile com os diversos canais PJ e PF do Banco Santander...',
            client: 'Santander',
            date: new Date(Date.parse('May 17, 2021')),
            likes: 53,
            points: 50},{
                id:2,
                name: 'Marcus Vinicius',
                nameProject: 'Automação caixa de email',
                description: 'Tratamento de e-mails e leitura de comprovantes para busca de propostas de moedas...',
                client: 'Confidence',
                date: new Date(Date.parse('May 16, 2021')),
                likes: 12,
                points: 20,
            }])
    }
}