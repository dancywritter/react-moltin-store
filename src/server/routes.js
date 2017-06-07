const Moltin = require('./auth')

module.exports = app => {

    app.get('/api/order/:id', (req, res) => {
        Moltin.Orders.Get(req.params.id).then((order) => {
            res.json(order);
        })
    })

}
