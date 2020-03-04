const express = require('express');

const dataRouter = express.Router();
let newData = require('./model');

dataRouter.route('/add').post((req,res)=>{
    let data = new newData(req.body);
    data.save().then(data =>{
        res.status(200).json({'person':'thanh cong'});
    }).catch(err=>res.status(400).send("loi roi"));
})


module.exports = dataRouter;