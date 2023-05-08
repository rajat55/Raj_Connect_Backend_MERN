const express = require('express');
const routerUser = require('./routes/users.js');
const routerPost = require('./routes/posts.js');
const mongoose = require("mongoose");
const cors = require("cors");



const MongoUrl =
  "mongodb+srv://rajatrajgupta19:Esb9FbZgFl0v5cex@cluster0.iazkmd6.mongodb.net/RajConnect";

//Esb9FbZgFl0v5cex,/?retryWrites=true&w=majority



async function dbConnection() {
  try {
    await mongoose.connect(MongoUrl);
    console.log("Connected to Db");
  } catch (E) {
    console.log("error in db Connection", E);
  }
}
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const app = express();
app.use(express.json());
app.use('/uploads',express.static('uploads'));


app.use('/user',cors(corsOptions),routerUser);
app.use('/post',cors(corsOptions),routerPost);


  
  app.use(cors(corsOptions));


app.get("/" ,(req,res)=>{
    res.send("hi");
}) 

app.listen( 8000,async(e)=>{
    await dbConnection();
    console.log("Server started on ")
})