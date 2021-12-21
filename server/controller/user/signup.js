const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4 } = require('uuid');
const { account } = require('../../models');

/**
 * @path /user/sign-up
 */
module.exports = {
  post: (req, res) => {
    const { user_id, pw_hash, name } = req.body;

    let message = '';

    if (user_id === undefined || pw_hash === undefined || name === undefined) {
      message = 'please check your information.';
      res.status(400).send({ message });
    } else {
      const salt = crypto.randomBytes(14).toString('base64');

      account.findOrCreate({
        where: { user_id },
        defaults: {
          uuid: v4(),
          pw_hash,
          name,
          salt,
          access: false,
          expired: false,
          created_at: new Date(),
        },
      }).then((result) => {
        if (!result[1]) {
          message = 'please check your id.';
          res.status(401).send({ message });
        } else {
          const { dataValues } = result[0];
          const tokenData = {
            user_id: dataValues.user_id,
            name: dataValues.name,
            access: dataValues.access,
          };
          const accessToken = jwt.sign(tokenData, dataValues.salt);

          message = 'sign-up success!';

          res.status(200).send({ message, accessToken });
        }
      });
    }
  },
};
