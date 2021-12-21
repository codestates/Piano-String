const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const { account } = require('../../models');
const { generateAccessToken, hashPassword } = require('../../utils');

/**
 * @path /user/sign-up
 */
module.exports = {
  post: async (req, res) => {
    const { user_id, pw_hash: pw, name } = req.body;

    if (user_id === undefined || pw === undefined || name === undefined) {
      res.status(400).send({ message: 'please check your information.' });
    }
    const uuid = v4();
    const created_at = new Date();
    const pw_hash = await hashPassword(pw);

    account.findOrCreate({
      where: { user_id },
      defaults: {
        uuid,
        pw_hash,
        name,
        created_at,
      },
    }).then(([row, created]) => {
      if (!created) {
        return res.status(401).send({ message: 'please check your id.' });
      }
      const access_token = generateAccessToken(row);

      res.status(201).send({
        message: 'sign-up success!',
        access_token,
        uuid: row.dataValues.uuid,
      });
    });
  },
};
