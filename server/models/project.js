const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    github: {
        type: String
    },
    live: {
        type: String
    },
    techStack: {
        type: [String]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);