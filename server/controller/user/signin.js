const { account } = require('../../models');
const { checkPassword, generateAccessToken, generateRefreshToken } = require('../../utils');

const respMsg = {
  fail: 'please check your information.',
  success: 'login success!',
}

/**
 * @path /user/sign-in
 */

module.exports = {
  post: async (req, res) => {
    const { user_id, pw_hash } = req.body;

    if (user_id === undefined || pw_hash === undefined) {
      return res.status(400).send({ message: respMsg.fail });
    }

    const row = await account.findOne({
      where: {
        user_id,
        expired_at: { [account.sequelize.Sequelize.Op.is]: null },
      },
    })

    if (row === null) {
      return res.status(401).send({ message: respMsg.fail });
    }

    if (!await checkPassword(row.dataValues.pw_hash, pw_hash)) {
      return res.status(401).send({ message: respMsg.fail });
    }


    res.cookie(
      'refreshToken',
      generateRefreshToken(row),
      {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      }
    );
    return res.status(200).send({
      message: respMsg.success,
      access_token: generateAccessToken(row),
      uuid: row.dataValues.uuid,
    });
  },
};
