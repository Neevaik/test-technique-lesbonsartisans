
function checkBody(body, keys) {
  for (const field of keys) {
    if (body[field]) {
      body[field] = body[field].replace(/\s+/g, ' ').trim();
    }
    if (!body[field]) {
      return false;
    }
  }

  return true;
}

function checkWhiteSpaces(str) {
  return /\s/.test(str);
}

module.exports = { checkBody, checkWhiteSpaces };
