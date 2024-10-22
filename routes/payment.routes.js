const { authJwt } = require("../middlewares");
const controller = require("../controllers/payment.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/payment/list', [authJwt.verifyToken], controller.list)
    app.post('/api/payment/add',[authJwt.verifyToken], controller.add)
}