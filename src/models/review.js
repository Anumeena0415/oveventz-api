const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        role: {
            type: String,
            required: [true, "Role is required"],
            trim: true
        },
        text: {
            type: String,
            required: [true, "Review text is required"],
            trim: true
        },
        stars: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating must be at most 5"]
        },
        image: {
            type: String,
            required: [true, "Image URL is required"],
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        order: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = ReviewModel;

