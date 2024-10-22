const { authJwt } = require("../middlewares");
const controller = require("../controllers/course.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    console.log("request ", req.body)
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/course/all",[authJwt.emptyToken],  controller.courseListPublic);

  app.post("/api/course/my", [authJwt.verifyToken], controller.courseListMy);
  app.get("/api/course/public/:id", controller.courseByIdPublic);
  app.post("/api/course/id/:id", [authJwt.verifyToken], controller.courseByIdPrivate);
  app.get("/api/course/enroll/:id", [authJwt.verifyToken], controller.courseUserAdd);
  app.get("/api/course/similar/:id", [authJwt.emptyToken], controller.courseSimilar);

//   app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

//   app.get(
//     "/api/test/mod",
//     [authJwt.verifyToken, authJwt.isModerator],
//     controller.moderatorBoard
//   );
//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
//   );
};