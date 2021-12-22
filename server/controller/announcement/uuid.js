const { account, announcement } = require('../../models');
const { verifyAccessToken } = require('../../utils');

/**
 * @path /announcement/:uuid
 */
module.exports = {
  /**
     * @method GET
     * @param { uuid } req.params
     */
  get: (req, res) => {
    const { uuid } = req.params;

    announcement.findOne({
      where: { uuid },
      attributes: [
        'uuid',
        'title',
        'content',
        'created_at',
      ],
    }).then((result) => {
      if (result === null) {
        return res.status(400).send({ message: 'please check your information.' });
      }

      return res.status(200).send({ message: 'success!', data:result.dataValues });
    });
  },
  /**
     * @method PATCH
     * @param { uuid } req.params
     * @param { authorization } req.headers
     * @param { title, content } req.body
     */
  patch: async (req, res) => {
    const { verified, data: userData } = verifyAccessToken(req);
    if (!verified) { res.status(401).send({ message: 'not authorized.' }); }

    const { uuid } = req.params;
    const { authorization } = req.headers;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send({ message: 'please check parameter.' });
    }

    const userRow = await account.findOne({
      where: { uuid: userData.uuid },
      attributes: ['access'],
    })

    if (!userRow || !userRow.access) {
      return res.status(401).send({ message: 'not authorized.' });
    }

    await announcement.update(
      { title, content },
      { where: { uuid } },
    )

    return res.status(204).send();
  },
  /**
     * @path DELETE
     * @param { uuid } req.params
     * @param { authorization } req.headers
     */
  delete: async (req, res) => {
    const { verified, data: userData } = verifyAccessToken(req);
    if (!verified) { res.status(401).send({ message: 'not authorized.' }); }

    const { uuid } = req.params;

    const userRow = await account.findOne({
      where: { uuid: userData.uuid },
      attributes: ['access'],
    })

    if (!userRow || !userRow.access) {
      return res.status(401).send({ message: 'not authorized.' });
    }

    await announcement.destroy({ where: { uuid } })

    return res.status(204).send();
  },
};
