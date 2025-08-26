require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRouts');
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json());
app.use(cookieParser())

mongoose.connect(process.env.DB_URL)
.then(
    console.log('database connected successfully...')
    
).catch((error)=>{
    console.log('Error while connecting to database : ',error);
    
})


app.use('/api',authRoutes);
app.use('/api',userRoutes);





const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server runing on PORT : ${port}`);
    
})