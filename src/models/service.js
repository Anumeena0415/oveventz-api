const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({ 
    title : String,
    description : String,
    image : String,
    price  : Number,
    rating : Number,
     category: {
      type: String,
      enum: [
        "Weddings",
        "Birthday",
        "Corporate",
        "Anniversary",
        "Baby Shower",
        "Theme Parties",
      ],}

})

const serviceModle = mongoose.model("services", serviceSchema);

module.exports = serviceModle; 