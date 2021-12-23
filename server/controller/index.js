const announcement = require('./announcement');
const article = require('./article');
const user = require('./user');
const utils = require('../utils');
const { account: accountModel } = require('../models');

const authController = {
  post: async (req, res) => {
    const { verified, data } = utils.verifyRefreshToken(req);
    if (!verified) {
      return res.status(400).send();
    }
    const row = await accountModel.findOne({ where: { uuid: data.uuid } })
    if (!row) { return res.status(401).send(); }
    res.cookie(
      'refreshToken',
      utils.generateRefreshToken(row),
      {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      }
    );
    return res.status(200).send({ uuid: row.uuid, access_token: utils.generateAccessToken(row) })
  }
}

module.exports = { userController: user, announcementController: announcement, articleController: article, authController };
