const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

module.exports = {
  generateAccessToken: (sequelizeInstance, secret=process.env.SERVER_SECRET) => {
    const { uuid, user_id, name } = sequelizeInstance.dataValues;
    return jwt.sign(
      { uuid, user_id, name, created_at: new Date() }, secret
    )
  },
  verifyAccessToken: (Request, secret=process.env.SERVER_SECRET) => {
    const result = {
      verified: false,
      data: null,
    }
    try {
      result.data = jwt.verify(Request.headers.authorization.split(' ')[1], secret);
      result.verified = true;
    } catch { }
    return result;
  },
  hashPassword: (password) => {
    return argon2.hash(password, { type: argon2.argon2id })
  },
  checkPassword: (hash, password) => {
    return argon2.verify(hash, password);
  },
}
