const authJwt = require("../middlewares/authJwt");
const UserController = require("../controllers/user.controller");
const AppController = require("../controllers/app.controller");
var router = require('express').Router();

module.exports = function(app){
    app.use(function (req,res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    router.post("/list", UserController.UserList);

    router.post("/update", UserController.UserUpdate); 

    router.post("/create", UserController.UserCreate);

    // User Delete
    router.post("/delete", UserController.UserDelete);

    // User Details
    router.post("/UserDetails", UserController.UserDetails);

    // DashboardDetails
    router.post("/DashboardDetails", AppController.DashboardDetails);


    // app.use("/api/user",[authJwt.verifyToken], router);
    app.use("/api/user", router);
};
