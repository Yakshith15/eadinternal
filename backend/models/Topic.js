const mongoose = require("mongoose");
//change
const TopicSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("Topic", TopicSchema);