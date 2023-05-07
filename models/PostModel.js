const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  
  userEmail:{
    type:String,
    required:true
  },
    description: {
    type: String,
    max: 200,
  },
  img: {
    type: String,
  },
  like: {
    type: Array,
    default: [],
  }
} ,{timestamps:true});


module.exports = mongoose.model('post',PostSchema);