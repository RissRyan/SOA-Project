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

// On exporte le model
module.exports = {

    // On dit que le Model User est créé à partir du Schema UserSchema et le Model sera stocké dans la base de donnée MongoDB sous le nom "user"
    Topic: mongoose.model('topic', TopicSchema)
}