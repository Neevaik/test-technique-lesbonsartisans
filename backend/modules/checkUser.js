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

module.exports = { checkUser };