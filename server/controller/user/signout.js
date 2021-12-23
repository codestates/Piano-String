const { account } = require('../../models');
const { checkPassword, generateAccessToken, generateRefreshToken } = require('../../utils');
/**
 * @path /user/sign-out
 */

module.exports = {
  post: async (req, res) => {

    res.clearCookie(
      'refreshToken',
      {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      }
    );

    return res.status(204).send();
  },
};
