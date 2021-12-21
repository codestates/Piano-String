const jwt = require('jsonwebtoken');
const { account } = require('../../models');

/**
 * @path /user/:uuid
 */
const verify = (data) => {
  const authorization = data.headers.authorization;
  if (!authorization) return null;
  const token = authorization.split(' ')[1];
  try {
    return jwt.verify(token, '1234');
  }
  catch (err) {
    return null;
  }
};

module.exports = {
  get: async (req, res) => {
    const accessData = verify(req);
    if (!accessData) {
      res.status(401).send({ message: 'please check your token.' });
    }
    else {
      await account.findOne({ where: { uuid: req.params.uuid, user_id: accessData.id } })
        .then((data) => {
          if (!data) {
            res.status(400).send({ message: 'not matched uuid.' });
          }
          else {
            const payload = {
              user_id: data.dataValues.user_id,
              name: data.dataValues.name,
              createdAt: data.dataValues.createdAt,
            };
            res.status(200).send({ message: 'success!', data: payload });
          }
        });
    }
  },
  patch: async (req, res) => {
    const accessData = verify(req);
    if (!accessData) {
      res.status(401).send({ data: null, message: 'please check your token.' });
    }
    else {
      const { pw_hash, name } = req.body;
      await account.update({ pw_hash: pw_hash, name: name },
        { where: { uuid: req.params.uuid, user_id: accessData.id } });
      await account.findOne({ where: { uuid: req.params.uuid, user_id:accessData.id } })
        .then((data) => {
          if (!data) {
            res.status(400).send({ message: 'please check your information.' });
          }
          else {
            const payload = {
              user_id: data.dataValues.user_id,
              name: data.dataValues.name,
              createdAt: data.dataValues.createdAt,
            };
            res.status(200).send({ message: 'change success!', data: payload });
          }
        });
    }
  },
  delete: async (req, res) => {
    const accessData = verify(req);
    if (!accessData) {
      res.status(401).send({ data: null, message: 'please check your token.' });
    }
    else {
      await account.destroy({ where: { user_id: accessData.id, uuid: req.params.uuid } })
        .then((data) => {
          if (!data) {
            res.status(400).send({ message: 'user does not exist.' });
          }
          else {
            res.status(200).send({ message: 'success!' });
          }
        });
    }
  },
};
