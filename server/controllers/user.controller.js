const App = require("../models/app.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.UserList = (req, res) => {
    const adminId = req.body.adminId;
    console.log("UserList Received Admin ID", adminId);
    App.getUserList(adminId, (data)=>{
        if(data){
            // console.log("User List DATA",data)
            res.status(200).json(data);
        }else if (data == 0){
            res.status(500).send({
                message:
                err.message || "Some error occurred try again."
            })
        }
    })
};


exports.UserUpdate = (req, res) => {
    const {userId, adminId, fullName, displayName, email, whatsappNumber, privateNote, capturedData, avatarUrl} = req.body;
    console.log("UserUpdate Received Admin ID", adminId);
    console.log("req BODY",req.body);
    // console.log("req BODY capturedData",req.body.capturedData);s

    App.update(`user_list`,`fullName='${fullName}', email='${email}', whatsapp_number='${whatsappNumber}', displayName='${displayName}', privateNote='${privateNote}', capturedData='${capturedData}', avatarUrl='${avatarUrl}'`,`adminId=${adminId} AND user_id=${userId}`, (data)=>{        if(data){
            // console.log("User update DATA",data)
            res.status(200).json(data);
        }else if (data == 0){
            res.status(500).send({
                message:
                err.message || "Some error occurred try again."
            })
        }
    })
};

exports.UserDelete = (req, res) => {
    const { userId, adminId } = req.body;
    console.log("UserDelete Received Admin ID", userId);
    console.log("req BODY", req.body);
    // console.log("req BODY capturedData",req.body.capturedData);s

    App.delete(`user_list`, `user_id=${userId} AND adminId=${adminId}`, (data) => {
        if (data) {
            // console.log("User update DATA",data)
            res.status(200).json(data);
        } else if (data == 0) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred try again."
            })
        }
    })
};

exports.UserCreate = (req, res) => {
    const UserData = req.body;
    console.log("UserCreate req  BODY",req.body);
    // console.log("req BODY capturedData",req.body.capturedData);s

    App.UserInsert(UserData, (data)=>{
        if(data){
            // console.log("User update DATA",data)
            res.status(200).json(data);
        }
    })
};


exports.AdminDetails = (req, res) => {
    const {adminId} = req.body;
    console.log("AdminDetails Received Admin ID", adminId);
    // console.log("req BODY",req.body);
    // console.log("req BODY capturedData",req.body.capturedData);s

    App.findOne(`admins`,`adminId=${adminId}`, (data)=>{if(data){
            // console.log("User update DATA",data)
            res.status(200).json(data);
        }else if (data == 0){
            res.status(500).send({
                message:
                err.message || "Some error occurred try again."
            })
        }
    })
};

// Get User Details

exports.UserDetails = (req, res) => {
    // Get User  Details from DB based on Admin ID
    const adminId = req.body.adminId
    console.log("UserDetails adminId--",adminId)
    App.getUserDetails(adminId,(data)=>{
      if(data){
        // console.log("DATA",data)
        res.status(200).json(data);
    }
    })
  };

// ------------------------- REPORT's ---------------------------

// Get User Message Reports

exports.MessageReport = (req, res) => {
    // Get Reports from DB based on userId, Admin ID
    const { adminId } = req.body;

    console.log("MessageReport adminId--",adminId)
    App.getMessageReport(adminId, (data) => {
        if (data) {
            // console.log("DATA",data)
            res.status(200).json(data);
        } else if (data == 0) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred try again."
            })
        }
    })
};

exports.MessageReportCreate = (req, res) => {
    // Get Reports from DB based on userId, Admin ID
    const { adminId } = req.body;

    console.log("MessageReportCreate adminId--",adminId)
    App.AddMessageReport(adminId, whatsapp_number, fullName, message_content, message_type, message_delivery, (data) => {
        if (data) {
            // console.log("DATA",data)
            res.status(200).json(data);
        } else if (data == 0) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred try again."
            })
        }
    })
};