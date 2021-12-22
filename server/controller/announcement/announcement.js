const { v4 } = require('uuid');
const { account, announcement } = require('../../models');
const { verifyAccessToken } = require('../../utils');

/**
 * @path /announcement
 */
module.exports = {
  /**
     * @method GET
     * @param { offset, limit } req.body
     */
  get: (req, res) => {
    let message = '';
    let data = {};

    // TODO: restrict page size?
    let limit = parseInt(req.query.limit ?? 10);
    let offset = parseInt(req.query.offset ?? 0);

    if (isNaN(offset) || isNaN(limit)) {
      message = 'please check your information.';
      return res.status(400).send({ message });
    }

    limit = Math.max(limit, 0) || 10
    offset = Math.max(offset, 0) && limit * offset;

    announcement.findAll({
      attributes: [
        'uuid',
        'title',
        'created_at',
      ],
      offset,
      limit,
      order: [
          ['created_at', 'DESC'],
      ]
    }).then((result) => {
      message = 'success!';
      res.status(200).send({ message, data: result });
    });
  },
  /**
     * @method POST
     * @param { authorization } req.header
     * @param { title, content } req.body
     */
  post: async (req, res) => {
    const { verified, data: { user_id } } = verifyAccessToken(req);
    if (!verified) { res.status(401).send({ message: 'not authorized.' }); }

    const { title, content } = req.body;
    if (title === undefined || content === undefined) {
      res.status(400).send({ message: 'please check parameter.' });
    }

    const userRow = await account.findOne({ where: { user_id } })
    const { uuid: account_uuid } = userRow;

    if (userRow === null || !userRow.access) {
      return res.status(401).send({ message: 'not authorized.' });
    }

    const new_uuid = v4();

    const [newRow, created]= await announcement.findOrCreate({
      where: { uuid: new_uuid },
      defaults: {
        account_uuid,
        title,
        content,
        created_at: new Date(),
      },
    })

    if (!created) {
      return res.status(400).send({ message: 'please try again.' });
    }

    message = 'success!';
    res.status(201).send({
      message: 'success!',
      uuid: newRow.uuid,
    });
  },
};
