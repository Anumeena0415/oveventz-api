const mongoose = require("mongoose");
require("dotenv").config();

const blogSchema = new mongoose.Schema({
    image : String,
    title : String,
    para : String
})

const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel; 