// 13 May 2024 Geir Hilmersen

// Global modules
const express = require('express');
const dotenv = require('dotenv').config();
const mongoose=require('mongoose');

// Local modules
const default_routes=require('./routes/default_routes');

//local variables
let db = null;

//init
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(default_routes);

app.listen(PORT, startup);


async function startup(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/", {dbName:'demo-app'});
    } catch(error) {
        console.log(error);
    }
    
    console.info(`Server now running @ port ${PORT}`);
}
