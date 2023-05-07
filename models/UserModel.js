const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 5,
    required: true,
    max: 25,

  },
  email: {
    type: String,
    min: 5,
    required: true,
    max: 50,
   
  },
  password: {
    type: String,
    min: 8,
    required: true, 
    max: 25,
  },
  profilePic: {
    type: String,
    default: "",
  },
  coverPic: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: []
  },
  description: {
    type: String,
    max: 100
  },
  city: {
    type: String
  },
  relationship: {
    type: String
  },
  education: {
    type: String
  },
},{
  
    timestamps:true}
  
);

module.exports = mongoose.model("Userbase",UserSchema);


