const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const PostModel = require('../models/PostModel');
const fs = require("fs");
const UserModel = require("../models/UserModel");
const routerPost = express.Router();

routerPost.post("/create", upload.single("img"), async (req, res) => {
  
    console.log(req.file);
  const extArr = req.file.originalname.split(".");
  const ext = extArr[extArr.length - 1];
  const newPath = req.file.path + "." + ext;
  fs.renameSync(req.file.path, newPath);
  console.log(newPath);

  const newPost = new PostModel({
    userEmail: req.body.email,
    description: req.body.description,
    img: newPath,
  });

   const resDb = await newPost.save();
   res.send(resDb);


});

routerPost.get('/profile/:id',async(req,res)=>{

    try{
        const UserDb = await UserModel.findById(req.params.id);
        console.log(UserDb.email);

        const resDb = await PostModel.find({userEmail:UserDb.email}).sort({createdAt : -1});
        console.log(resDb);
        res.json(resDb);
    }catch(e){
        console.log(e);
        res.send("error");
    }





});

routerPost.get('/timeline/:id',async(req,res)=>{

    try{
        const UserDb = await UserModel.findById(req.params.id);
        console.log(UserDb.email);

        const resDb = await PostModel.find().sort({createdAt: -1});
        console.log(resDb);
        res.json(resDb);
    }catch(e){
        console.log(e);
        res.send("error");
    }





});

module.exports = routerPost;
