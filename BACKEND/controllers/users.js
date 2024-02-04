const models = require("../models/user.js")
const {getKeysNotProvided, isObjectIdStringValid} = require("../utils/utils.js");

async function createUser(userParams) {
    // On regarde déjà si tous les champs de l'utilisateur sont présents
    const neededKeys = ["username", "password"];
    const keysNotGiven = getKeysNotProvided(neededKeys, userParams);

    // Si une ou plusieurs clefs ne sont pas données alors on renvoie un message d'erreur
    if (keysNotGiven.length !== 0) {
        return {status: -1, msg: "Remplissez toutes les informations"}
    }

    const lookingForIdentifiant = await models.User.find({username: userParams.username}).count() 

    if(lookingForIdentifiant > 0)
    {
        return {status: -1, msg: "Ce pseudo existe déjà !"}
    }

    try{
        const newUser = new models.User(userParams)
        await newUser.save();
        return {status: 0, msg: "Votre compte a été créé !"}

    }catch(e){
        return {status: -1, msg: "Impossible de créer l'utilisateur"}
    }
}

async function isThisUserExist(username, password){
    return await models.User.find({username: username, password: password});
}

module.exports = {
    createUser: createUser,
    isThisUserExist: isThisUserExist
}