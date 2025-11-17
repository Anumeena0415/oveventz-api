const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
    title : String,
    image : String,
    desc : String

})

const homeModle = mongoose.model("homeScreen", homeSchema);

module.exports = homeModle; 