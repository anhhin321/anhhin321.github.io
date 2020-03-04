const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newData = new Schema({
    name: {type: String},
    age:{type: String},
    email:{type: String}
},
{collection: 'data'}
)
module.exports = mongoose.model('newData',newData);