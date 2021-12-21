const jwt = require('jsonwebtoken');
const { account } = require('../../models');

/**
 * @path /user/:uuid
 */

const verify = (authorization, salt) => {
  try {
    return jwt.verify(authorization, salt);
  } catch (err) {
    return null;
  }
};

module.exports = {
  get: (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ message: 'please check your token.' });
    }

    account.findOne({ where: { uuid: req.params.uuid } })
      .then((data) => {
        if (!data) {
          return res.status(400).send({ message: 'not matched uuid.' });
        }

        const accessData = verify(authorization, data.dataValues.salt);
        if (!accessData) {
          return res.status(401).send({ message: 'please check your token.' });
        }
        const payload = {
          user_id: accessData.user_id,
          name: accessData.name,
          created_at: accessData.created_at,
        };
        return res.status(200).send({ message: 'success!', data: payload });
      });
  },
  patch: (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ message: 'please check your token.' });
    }
    account.findOne({ where: { uuid: req.params.uuid } }).then((data) => {
      if (!data) {
        return res.status(400).send({ message: 'please check your information.' });
      }

      const { pw_hash, name } = req.body;
      const accessData = verify(authorization, data.dataValues.salt);
      if (!accessData) {
        return res.status(401).send({ message: 'please check your token.' });
      }
      account.update({ pw_hash, name }, { where: { uuid: req.params.uuid } })
        .then(() => {
          account.findOne({ where: { uuid: req.params.uuid } }).then((result) => {
            const payload = {
              user_id: result.dataValues.user_id,
              name: result.dataValues.name,
              created_at: result.dataValues.created_at,
            };
            return res.status(200).send({ message: 'change success!', data: payload });
          });
        });
    });
  },
  delete: (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ data: null, message: 'please check your token.' });
    }

    account.findOne({ where: { uuid: req.params.uuid } }).then((data) => {
      if (!data) {
        return res.status(400).send({ message: 'user does not exist.' });
      }

      const accessData = verify(authorization, data.dataValues.salt);
      if (!accessData) return res.status(401).send({ message: 'please check your token.' });
      account.destroy({ where: { uuid: req.params.uuid } }).then(() => res.status(200).send({ message: 'success!' }));
    });
  },
};
