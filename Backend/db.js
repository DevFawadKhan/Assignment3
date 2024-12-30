const mongoose = require('mongoose');
const DBCONNECT=async ()=>{
try {
    await  mongoose.connect('mongodb://localhost:27017/Assignment3')

    console.log('Connected to Assignment3 database');
} catch (error) {
    console.log('Error connecting to the database:', err);
}
}
module.exports= DBCONNECT