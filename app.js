require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./Models/User');
const authRoutes = require('./Routes/authRoutes');

app.use(express.json());


mongoose.connect(process.env.DB_URL)
.then(
    console.log('database connected successfully...')
    
).catch((error)=>{
    console.log('Error while connecting to database : ',error);
    
})


app.use('/api',authRoutes);










const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server runing on PORT : ${port}`);
    
})