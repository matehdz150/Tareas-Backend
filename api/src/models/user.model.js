const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}, 
    password: {type: String, required: true},
    status: {type: String, default: 'new'},
    role: {type: String, default: 'guest'}
});

module.exports= model('user',schema);