const jwt = require('jsonwebtoken');
const { account } = require('../../models');
const { generateAccessToken, verifyAccessToken } = require('../../utils');

/**
 * @path /user/:uuid
 */

// TODO: JWT verification with separate middleware
module.exports = {
  get: async (req, res) => {
    const auth = verifyAccessToken(req);

    if (!auth.verified || auth.data.uuid !== req.params.uuid) {
      return res.status(401).send({ message: 'please check your token.' });
    }

    const row = await account.findOne({ where: { uuid: req.params.uuid } });
    if (!row) { return res.status(400).send({ message: 'not matched uuid.' }); }

    const { user_id, name, created_at } = row.dataValues;

    return res.status(200).send({
      message: 'success!',
      data: { user_id, name, created_at },
    });
  },
  patch: async (req, res) => {
    const auth = verifyAccessToken(req);

    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ message: 'please check your token.' });
    }

    const oldRow = await account.findOne({ where: { uuid: req.params.uuid } })

    if (!oldRow) {
      return res.status(400).send({ message: 'please check your information.' });
    }

    const { pw_hash, name } = req.body;
    if (auth.data.uuid !== req.params.uuid) {
      return res.status(401).send({ message: 'please check your token.' });
    }

    await account.update({ pw_hash, name }, { where: { uuid: req.params.uuid } });
    const newRow = await account.findOne({ where: { uuid: req.params.uuid } })
    const payload = {
      user_id: newRow.dataValues.user_id,
      name: newRow.dataValues.name,
      created_at: newRow.dataValues.created_at,
    };

    return res.status(200).send({ message: 'change success!', data: payload });
  },
  delete: async (req, res) => {
    const auth = verifyAccessToken(req);

    if (!auth.verified || auth.data.uuid !== req.params.uuid) {
      return res.status(401).send({ message: 'please check your token.' });
    }

    const row = await account.findOne({ where: { uuid: req.params.uuid } })
    if (!row) { return res.status(400).send({ message: 'user does not exist.' }); }

    await account.destroy({ where: { uuid: req.params.uuid } });
    return res.status(200).send({ message: 'success!' });
  },
  getPermission: async (req, res) => {
    const auth = verifyAccessToken(req);

    if (!auth.verified || auth.data.uuid !== req.params.uuid) {
      return res.status(401).send({ message: 'please check your token.' });
    }

    const row = await account.findOne({ where: { uuid: req.params.uuid } });
    if (!row) { return res.status(400).send({ message: 'not matched uuid.' }); }

    return res.status(200).send({
      message: 'success!',
      data: row.admin,
    });
  },
};
