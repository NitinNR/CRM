const verifySignUp = require("../middlewares/VerifySignUp");
const controller = require("../controllers/auth.controller");
var router = require('express').Router();

module.exports = function(app) {
    app.use(function(req, res, next){
        res.header(
            "Access-Controll-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/signup", [verifySignUp.checkDuplicateChatbotOrEmail], controller.SignUp);

    router.post("/signin", controller.SignIn);

    router.post("/refreshToken", controller.refreshToken);

    router.post("/ApiKey", controller.ApiKey);

    app.use("/api/auth",router);

};

