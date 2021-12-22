const jwt = require('jsonwebtoken');
const { account, announcement } = require('../../models');

// test hash token
const HASH_TOKEN = 'test';

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

    let message = '';
    let data = {};

    announcement.findOne({
      where: { uuid },
      attributes: [
        ['uuid', 'announcement'],
        'title',
        'content',
        'created_at',
      ],
    }).then((result) => {
      if (result === null) {
        message = 'please check your information.';
        res.status(400).send({ message });
      } else {
        const { dataValues } = result;

        message = 'success!';
        data = dataValues;
        res.status(400).send({ message, data });
      }
    });
  },
  /**
     * @method PATCH
     * @param { uuid } req.params
     * @param { authorization } req.headers
     * @param { title, content } req.body
     */
  patch: (req, res) => {
    const { uuid } = req.params;
    const { authorization } = req.headers;
    const { title, content } = req.body;

    let message = '';
    let data = {};

    if (authorization === undefined) {
      message = 'not authorized.';
      res.status(401).send({ message });
    }
    if (title === undefined || content === undefined) {
      message = 'please check parameter.';
      res.status(400).send({ message });
    }

    try {
      const auth = authorization.split(' ')[1];
      const token = jwt.verify(auth, HASH_TOKEN);
      const { user_id } = token;

      if (user_id !== undefined || user_id !== null) {
        account.findOne({
          where: { user_id },
          attributes: [
            'access',
          ],
        }).then((result) => {
          const { access } = result;

          if (!access || access === undefined) {
            message = 'not authorized.';
            res.status(401).send({ message });
          } else {
            announcement.update({
              title,
              content,
            }, { where: { uuid } }).then((result2) => {
              console.log(result2);
              if (result2[0] > 0) {
                announcement.findOne({
                  where: { uuid },
                  attributes: [
                    ['uuid', 'announcement'],
                    'title',
                    'content',
                    'created_at',
                  ],
                }).then((result3) => {
                  const { dataValues } = result3;

                  message = 'success!';
                  data = dataValues;
                  res.status(400).send({ message, data });
                });
              } else {
                message = 'please check parameter.';
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
  /**
     * @path DELETE
     * @param { uuid } req.params
     * @param { authorization } req.headers
     */
  delete: (req, res) => {
    const { uuid } = req.params;
    const { authorization } = req.headers;

    let message = '';
    const data = {};

    if (authorization === undefined) {
      message = 'not authorized.';
      res.status(401).send({ message });
    }

    try {
      const auth = authorization.split(' ')[1];
      const token = jwt.verify(auth, HASH_TOKEN);
      const { user_id } = token;

      if (user_id !== undefined || user_id !== null) {
        account.findOne({
          where: { user_id },
          attributes: [
            'access',
          ],
        }).then((result) => {
          const { access } = result;

          if (!access || access === undefined) {
            message = 'not authorized.';
            res.status(401).send({ message });
          } else {
            announcement.destroy({ where: { uuid } }).then((result) => {
              if (result > 0) {
                message = 'success!';
                res.status(200).send({ message });
              } else {
                message = 'please check parameter.';
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
