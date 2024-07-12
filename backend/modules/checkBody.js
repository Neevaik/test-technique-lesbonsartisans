function checkBody(body, keys) {
    for (const field of keys) {
        if (!body[field]) {
            return false;
        }
    }
    return true;
}

module.exports = { checkBody };
