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
    let { limit, offset } = req.query;

    let message = '';
    let data = {};

    limit = limit !== undefined ? parseInt(limit) : 10;
    offset = offset !== undefined ? parseInt(offset) : 0;
    
    if (isNaN(offset) || isNaN(limit)) {
      message = 'please check your information.';
      res.status(400).send({ message });
    } else {
      limit = limit > 0 ? limit : 10;
      offset = offset >= 0 ? offset * limit : 0;

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
            ['title', 'ASC']
        ]
      }).then((result) => {
        message = 'success!';
        data = { announcement_list: result };
        res.status(200).send({ message, data });
      });
    }
  },
  /**
     * @method POST
     * @param { authorization } req.header
     * @param { title, content } req.body
     */
  post: (req, res) => {
    const { authorization } = req.headers;
    const { title, content } = req.body;

    let message = '';
    const data = {};

    if (authorization === undefined) {
      message = 'not authorized.';
      res.status(401).send({ message });
    }
    if (title === undefined || content === undefined) {
      message = 'please check parameter.';
      res.status(400).send({ message });
    }

    try {
      const token = verifyAccessToken(req);
      const { verified } = token;

      if (verified) {
        const { user_id } = token.data;
        
        account.findOne({ where: { user_id } }).then((result) => {
          const { uuid } = result;

          if (result === null || !result.access) {
            message = 'not authorized.';
            res.status(401).send({ message });
          } else {
            const announcement_uuid = v4();

            announcement.findOrCreate({
              where: { uuid: announcement_uuid },
              defaults: {
                account_uuid: uuid,
                title,
                content,
                created_at: new Date(),
              },
            }).then((result) => {
              if (result[1]) {
                message = 'success!';
                data['announcement_uuid'] = announcement_uuid;
                res.status(201).send({ message, data });
              } else {
                message = 'please try again.';
                res.status(400).send({ message });
              }
            });
          }
        });
      } else {
        message = 'not authorized.';
        res.status(401).send({ message });
      }
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        message = 'not authorized.';
        res.status(401).send({ message });
      } else {
        console.log(err);
        message = 'please check parameter.';
        res.status(400).send({ message });
      }
    }
  },
};
