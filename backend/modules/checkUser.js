
const { checkBody,checkWhiteSpaces } = require('./tools/inspectBody');
const User = require('../models/users');

async function checkUser(username) {
    try {
        const existingUser = await User.findOne({ username });
        return !!existingUser;
    } catch (error) {
        console.error("Error checking user existence:", error);
        return false;
    }
}

async function validateSignup(reqBody) {
    const { username, password } = reqBody;
    const requiredFields = ['username', 'password'];

    if (!checkBody(reqBody, requiredFields)) {
        return { isValid: false, message: 'Missing or empty fields' };
    }

    if (checkWhiteSpaces(username)) {
        return { isValid: false, message: 'Username contains spaces' };
    }

    const userExists = await checkUser(username);
    if (userExists) {
        return { isValid: false, message: 'User already exists' };
    }

    return { isValid: true, username };
}
module.exports = { validateSignup };