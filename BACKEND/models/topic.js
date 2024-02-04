const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({

    owner: {
        type: Schema.Types.String,
        required: true
    },

    title: {
        type: Schema.Types.String,
        required: true
    },

    content: {
        type: Schema.Types.String,
        required: true
    },

    createdAt: {
        type: Schema.Types.Date,
        default: Date.now
    }
});

const MessageSchema = new Schema({

    topicID: {
        type: Schema.Types.String,
        required: true
    },

    owner: {
        type: Schema.Types.String,
        required: true
    },

    content: {
        type: Schema.Types.String,
        required: true
    },

    createdAt: {
        type: Schema.Types.Date,
        default: Date.now
    }

});

// On exporte le model
module.exports = {

    Topic: mongoose.model('topic', TopicSchema),
    Message: mongoose.model('message', MessageSchema)
}