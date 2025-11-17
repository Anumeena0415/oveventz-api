const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    type: String,
    date: Date,
    city: String,
    guests: Number,
    budget: Number,
    venuePreference: String,
    services: [String],
    name: String,
    email: String,
    status:String,
    phoneNo: {
        type: String,
        required: true,
        // match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    }

})

const coustomerEventModel = mongoose.model("customer", customerSchema);

module.exports = coustomerEventModel; 