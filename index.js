const express = require('express');
const dotenv = require('dotenv').config()
const routes = require('./src/routes');

const app = express();

app.use('', routes);

let port = process.env.PORT || 3000;

app.listen(port, () =>{
    if(process.env.NODE_ENV == 'dev'){
        console.log('App is running in port '+port)
    }else{
        console.log('App running '+ port);  
    }
    
});