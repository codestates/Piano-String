const { article, music: musicModel, tag: tagModel, article_tag } = require('../../models');
const { generateAccessToken, verifyAccessToken } = require('../../utils');
const { v4 } = require('uuid');

/**
 * @path /article/
 */
module.exports = {
  get: async (req, res) => {
    const auth = verifyAccessToken(req);
    if (!auth.verified) {
      return res.status(401).send({ message: 'please check your token.' });
    }
    const row = await article.findAll({ where: { account_uuid: auth.data.uuid } })
    if (row.length===0) { return res.status(400).send({ message: `please check article's information.` }); }
    const articleList = row.map((el)=>{
      const { uuid, title, created_at } = el.dataValues
      return { uuid, title, created_at }
    })
    // console.log('returning');
    return res.status(200).send({
      message: 'success!',
      data: articleList
    });

  },
  post: async (req, res) => {
    const auth = verifyAccessToken(req);
    if (!auth.verified) {
      return res.status(401).send({ message: 'please check your token.' });
    }

    const uuid = v4();
    const account_uuid = auth.data.uuid
    const created_at = new Date()

    const { title, content, tag, music } = req.body
    // console.log(title, content, music);
    if(!title || !content || !music){
      return res.status(400).send({message:`please check article's information.`})
    }

    // const musicInfo = await music.findOne({where:{uuid:req.body.music_uuid}})

    const musicRow = await musicModel.create({
      uuid: v4(),
      account_uuid,
      created_at,
      content: music,
    })

    const { uuid: article_uuid } = await article.create({
      uuid,
      account_uuid,
      created_at,
      title,
      content,
      music_uuid:musicRow.uuid
    })

    const tagRowList = [];
    for (let tagTitle of tag) {
      const [tagRow, created] = await tagModel.findOrCreate({
        where: { title: tagTitle },
      });
      tagRowList.push(tagRow.uuid);
    }
    await article_tag.bulkCreate(
      tagRowList.map(tag_uuid => ({ tag_uuid, article_uuid })),
      { ignoreDuplicates: true }
    )

    res.status(201).send({
      message: 'success!',
      uuid: article_uuid,
    });
  }
}

