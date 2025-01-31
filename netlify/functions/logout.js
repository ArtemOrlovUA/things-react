const cookie = require('cookie');

exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': cookie.serialize('auth', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        path: '/',
        expires: new Date(0),
      }),
    },
    body: JSON.stringify({ success: true }),
  };
};
