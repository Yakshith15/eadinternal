const mongoose = require("mongoose");

const dataEntrySchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    dataLink: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("DataEntry", dataEntrySchema);