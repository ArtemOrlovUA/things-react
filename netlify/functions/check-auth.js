const cookie = require('cookie');
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  try {
    const cookies = cookie.parse(event.headers.cookie || '');
    if (!cookies.auth) throw new Error('Unauthorized');

    const user = jwt.decode(cookies.auth);
    return { statusCode: 200, body: JSON.stringify({ user }) };
  } catch (error) {
    return { statusCode: 401, body: JSON.stringify({ error: error.message }) };
  }
};
