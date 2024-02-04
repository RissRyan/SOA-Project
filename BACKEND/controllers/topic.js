const models = require("../models/topic.js")
const {getKeysNotProvided, isObjectIdStringValid} = require("../utils/utils.js");

async function createTopic(owner, title, content){
    try{
        const newTopic = new models.Topic({owner: owner, title: title, content: content})
        await newTopic.save();
        return {status: 0, msg: "Votre topic a été créé !"}

    }catch(e){
        return {status: -1, msg: "Impossible de créer le topic"}
    }
}

async function createMessage(topicID, owner, content)
{
    try{
        const newMessage = new models.Message({topicID: topicID, owner: owner, content: content})
        await newMessage.save();
        return {status: 0, msg: "Votre message a été créé !"}

    }catch(e){
        return {status: -1, msg: "Impossible de créer le message"}
    }
}

async function getMessages(topicID)
{
    try {
        return await models.Message.find({ topicID: topicID });
    }
    catch (e) {
        return "Il y a eu une erreur lors de la recuperation des messages";
    }
}

async function getTopics() {

    // On essaye de récupérer TOUS les utilisateurs (donc on ne met pas de conditions lors de la recherche, juste un object vide)
    try {
        return await models.Topic.find({})
    }
    catch (e) {
        return "Il y a eu une erreur lors de la recuperation des utilisateurs";
    }
}

async function readTopic(topicID) {
    if (topicID === undefined || !isObjectIdStringValid(topicID)) {
        return "L'id du thread n'existe pas ou n'est pas un id MongoDB"
    }

    try {

        
        const topicFound = await models.Topic.findById(topicID);
        
        if (topicFound === null) {
            return "Le thread n'existe pas"
        }


        return topicFound;
    }

    catch (e) {
        return "Erreur lors de la recherche du thread";
    }
}

module.exports = {
    createTopic: createTopic,
    getTopics: getTopics,
    createMessage: createMessage,
    getMessages: getMessages,
    readTopic: readTopic
}