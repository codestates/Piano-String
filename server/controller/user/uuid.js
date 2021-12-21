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
    return {data:jwt.verify(token, '1234'), confirm:true}
  }
  catch (err) {
    return {data:{}, confirm:false}
  }
};

module.exports = {
  get: (req, res) => {
    const accessData = verify(req);
    if (accessData.confirm===false) {
      res.status(401).send({ message: 'please check your token.' });
    }
    else {
      account.findOne({ where: { uuid: accessData.data.uuid } })
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
  patch:  (req, res) => {
    const accessData = verify(req);
    if (accessData.confirm===false) {
      res.status(401).send({ data: null, message: 'please check your token.' });
    }
    else {
      const { pw_hash, name } = req.body;
      account.update({ pw_hash: pw_hash, name: name }, { where: { uuid: accessData.data.uuid } })
      .then((data)=>{
        if (!data) {
          res.status(400).send({ message: 'please check your information.' });
        }
        else{
          account.findOne({ where: { uuid: accessData.data.uuid } }).then((data) => {
            const payload = {
              user_id: data.dataValues.user_id,
              name: data.dataValues.name,
              createdAt: data.dataValues.createdAt,
            };
            res.status(200).send({ message: 'change success!', data: payload });
        });
        }
      })
      
    }
  },
  delete: (req, res) => {
    const accessData = verify(req);
    if (accessData.confirm===false) {
      res.status(401).send({ data: null, message: 'please check your token.' });
    }
    else {
      account.destroy({ where: { uuid: accessData.data.uuid } })
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
