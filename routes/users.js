const routerUser = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require('fs');


routerUser.post("/register", async (req, res) => {
  try {
    //generate new password
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(201).json({ sucess: true });
  } catch (err) {
    res.status(500).json({ sucess: false });
  }
});

routerUser.post("/login", async (req, res) => {
  try {
    const UserFound = await User.findOne({ email: req.body.email });
    console.log(UserFound);
    if (UserFound) {
      const isvalidPass = await bcrypt.compare(
        req.body.password,
        UserFound.password
      );
      if (isvalidPass) {
        const jwtToken = jwt.sign(
          { username: UserFound.username, email: UserFound.email },
          "asdfghjk"
        );
        res.json({ sucess: true, userToken: jwtToken, userId: UserFound._id });
      } else {
        res.json({ sucess: false, userToken: "" });
      }
    } else res.send({ sucess: false, message: "User Not Found" });
  } catch (e) {
    res.send(e);
  }
});

routerUser.post("/update/:id",
  upload.fields([
    { name: "ProfileImg", maxCount: 1 },
    { name: "CoverImg", maxCount: 1 },
  ]),
  async (req, res) => {
   
    var ProfileImg = null;
    var CoverImg = null;
    if(req.files.ProfileImg){
     ProfileImg = req.files.ProfileImg[0];
    }
    if(req.files.CoverImg){
     CoverImg = req.files.CoverImg[0];
    }
    console.log(ProfileImg);
    //console.log(ProfileImg.originalname);

    const id = req.params.id;
    console.log(req.body);
    console.log(id,req.body.userId);
    if (id === req.body.userId) {
      
      const extArr1 = ProfileImg.originalname.split(".");
      const extArr2 = CoverImg.originalname.split(".");
      const ext = extArr1[extArr1.length - 1];
      const ext2 = extArr2[extArr2.length - 1];

      const newPath = ProfileImg.path + "." + ext;
      const newPath2 = CoverImg.path + "." + ext2;
      fs.renameSync(ProfileImg.path, newPath);
      fs.renameSync(CoverImg.path, newPath2);
      console.log(newPath);

      const dbRes = await User.findOneAndUpdate(
        { _id: id }, // Find the user with this name
        {
          username: req.body.username,
          description: req.body.description,
          city: req.body.city,
          relationship: req.body.relationship,
          education: req.body.education,
          profilePic: newPath,
          coverPic: newPath2,
        }, // Update the user's age to 30
        { new: true } // Return the updated document instead of the original
      );

      console.log(dbRes);
      res.json(dbRes);
    } else {
      res.send("not ok");
    }
  }
);

routerUser.post('/data',async (req,res)=>{
    console.log(req.body.userEmail);
    const resDb = await User.findOne({email : req.body.userEmail});
    console.log(resDb);
    res.json(resDb);
})
routerUser.get('/:id',async (req,res)=>{
const id = req.params.id
const user = await User.findById(id);
res.json(user);


})

routerUser.get('/followlist',async (req,res)=>{
    
    try{
    
    const userFollow = "await User.find();"
    console.log(userFollow);
    res.json(userFollow);
    }catch(e){
        console.log(e);
        res.send("not");
    }
    
    
})

module.exports = routerUser;
