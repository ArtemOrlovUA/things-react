const jwt = require('jsonwebtoken');
const cookie = require('cookie');

exports.handler = async (event) => {
  try {
    const { token } = JSON.parse(event.body);
    const decoded = jwt.decode(token);
    if (!decoded) throw new Error('Invalid token');

    // HTTP-only cookie
    const authCookie = cookie.serialize('auth', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': authCookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true, user: decoded }),
    };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
  }
};
