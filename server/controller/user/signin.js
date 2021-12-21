const jwt = require('jsonwebtoken');
const { account } = require('../../models');

/**
 * @path /user/sign-in
 */
module.exports = {
  post: (req, res) => {
    const { user_id, pw_hash } = req.body;

    let message = '';

    if (user_id === undefined || pw_hash === undefined) {
      message = 'please check your information.';
      res.status(400).send({ message });
    } else {
      account.findOne({
        where: {
          user_id,
          pw_hash,
        },
      }).then((result) => {
        if (result === null) {
          message = 'login failed. please check your information.';
          res.status(401).send({ message });
        } else {
          const { dataValues } = result;
          const tokenData = {
            user_id: dataValues.user_id,
            name: dataValues.name,
            created_at: new Date(),
          };
          const accessToken = jwt.sign(tokenData, dataValues.salt);

          console.log(accessToken);

          message = 'login success!';

          res.status(200).send({
            message,
            accessToken,
            uuid: dataValues.uuid,
          });
        }
      });
    }
  },
};
