const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/post/list', controller.list)
}