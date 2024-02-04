const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Ce schema sera utilisé pour stocker les utilisateurs
 * @schema : User
 */
const UserSchema = new Schema({

    username: {
        type: Schema.Types.String,
        required: true
    },

    password: {
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
    User: mongoose.model('user', UserSchema)
}