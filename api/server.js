const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./DB');
const mongoose = require('mongoose');

const dataRouter = require('./router');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Database connected');
},
err =>{console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('',dataRouter)
app.listen('8000',()=>{
    console.log('server run 8000');
})