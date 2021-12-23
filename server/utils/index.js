const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

function _generateToken(sequelizeInstance, expiresIn, secret=process.env.SERVER_SECRET) {
  const { uuid, user_id, name } = sequelizeInstance.dataValues;
  return jwt.sign(
    { uuid, user_id, name, created_at: new Date(), expiresIn }, secret
  )
}

function _verifyToken(token, secret=process.env.SERVER_SECRET) {
  const result = {
    verified: false,
    data: null,
  }
  try {
    result.data = jwt.verify(token, secret);
    result.verified = true;
  } catch(e) { console.log(e) }

  return result;
}

module.exports = {
  generateAccessToken: (sequelizeInstance) => {
    const { uuid, user_id, name } = sequelizeInstance.dataValues;
    return _generateToken(sequelizeInstance, '1m');
  },
  verifyAccessToken: (Request) => {
    let authHeader;
    if (!(authHeader = Request.headers.authorization)) {
      console.log('ERROR: access token not present', Request.baseUrl);
      return [false, ''];
    }
    return _verifyToken(Request.headers.authorization.split(' ')[1]);
  },
  generateRefreshToken: (sequelizeInstance) => {
    const { uuid, user_id, name } = sequelizeInstance.dataValues;
    return _generateToken(sequelizeInstance, '10m');
  },
  verifyRefreshToken: (Request) => {
    if (!Request.cookies.refreshToken) {
      console.log('ERROR: refresh token not present');
      return [false, ''];
    }
    return _verifyToken(Request.cookies.refreshToken);
  },
  hashPassword: (password) => {
    return argon2.hash(password, { type: argon2.argon2id })
  },
  checkPassword: (hash, password) => {
    return argon2.verify(hash, password);
  },
}
