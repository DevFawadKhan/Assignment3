const express = require('express');
const cors = require('cors');
const app = express();
const DBCONNECT=require('./db.js')
const {loginUser,registerUser}=require('./usercontroller.js')
app.use(cors({
    origin: 'http://localhost:8081'  // Allow only requests from this frontend URL
  }));
app.use(express.json());

app.post('/api/signup',registerUser);
app.post('/api/login',loginUser)
app.listen(5000, () => {
    DBCONNECT();
    console.log("Server is running on port 5000");
});