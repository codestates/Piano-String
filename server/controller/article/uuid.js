const { generateAccessToken, verifyAccessToken } = require('../../utils');
const { article, music, article_tag, tag } = require('../../models');
const { v4 } = require('uuid');
/**
 * @path /user/:uuid
 */

module.exports = {
  get: async (req, res) => {
    const auth = verifyAccessToken(req);
    if (!auth.verified ) {
      return res.status(401).send({ message: 'please check your token.' });
    }
    const row = await article.findOne({ where: { uuid: req.params.uuid } })
    if (!row) { return res.status(400).send({ message: `please check article's uuid.` }); }

    const musicInfo = await music.findOne({where:{uuid:row.dataValues.music_uuid}})
    if (!musicInfo) { return res.status(400).send({ message: `please check article's uuid.` }); }

    // const currentTag = await article_tag.findOne({where:{article_uuid:req.params.uuid}}).then((data)=>{
    //   if(!data) return
    //   else {
    //     return tag.findOne({where:{uuid:data.dataValues.tag_uuid}})
    //   }
    // })

    const data = {
        title: row.dataValues.title,
        content: row.dataValues.content,
        music_title: musicInfo.dataValues.title,
        music_content: musicInfo.dataValues.content,
        created_at: row.dataValues.created_at,
    }

    res.status(200).send({ message:'success!', data })
  },
  patch: async (req, res) => {
    const auth = verifyAccessToken(req);
    if (!auth.verified ) {
      return res.status(401).send({ message: 'please check your token.' });
    }
    const row = await article.findOne({ where: { uuid: req.params.uuid } })
    if (!row || row.account_uuid !== auth.data.uuid) {
      return res.status(400).send({ message: `please check article's information.` });
    }

    const { title, content } = req.body
    if(!title || !content){
      return res.status(400).send({message: `please check article's information.`})
    }

    const updated = article.update({
      title:title,
      content:content,
    }, { where: { uuid: req.params.uuid } })

    res.status(204).send();

  },
  delete: async (req, res) => {
    const auth = verifyAccessToken(req);
    if (!auth.verified) {
      return res.status(401).send({ message: 'please check your token.' });
    }

    const row = await article.findOne({ where: { uuid: req.params.uuid } })
    if (!row) { return res.status(400).send({ message: 'article does not exist.' }); }

    await article_tag.destroy({where:{article_uuid:req.params.uuid}})
    await article.destroy({where:{uuid:req.params.uuid}})

    return res.status(200).send({ message: 'success!' });
  },
}

