function isObjectIdStringValid(objectId) {
    return new RegExp("^[0-9a-fA-F]{24}$").test(objectId);
}

function getKeysNotProvided(keys, object) {
    return keys.filter((key) => !object.hasOwnProperty(key) || object[key] === "");
}

// On exporte les modules
module.exports = {
    isObjectIdStringValid: isObjectIdStringValid,
    getKeysNotProvided: getKeysNotProvided
}