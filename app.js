require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DB_URL)
.then(
    console.log('database connected successfully...')
    
).catch((error)=>{
    console.log('Error while connecting to database : ',error);
    
})








const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server runing on PORT : ${port}`);
    
})