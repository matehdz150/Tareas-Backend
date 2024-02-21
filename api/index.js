const express = require('express');
const dotenv = require('dotenv').config()
const routes = require('./src/routes');
const mongoose = require('mongoose');

const app = express();


app.use('', routes);

let port = process.env.PORT || 3000;

//connect database
const db_url = process.env.URL_DB;
console.log(db_url);
async function connect() {
    try {
        await mongoose.connect(db_url);
        app.listen(port, () => {
            if (process.env.NODE_ENV == 'dev') {
                console.log('App is running in port ' + port)
            } else {
                console.log('App running ' + port);
            }

        });
    } catch (e) {
        console.log('failed to connect to db ', e);
    }
}

connect();