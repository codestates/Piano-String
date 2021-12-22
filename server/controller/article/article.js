const { article, music, tag, article_tag } = require('../../models');
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
    console.log(req.query.uuid)
    const row = await article.findAll({ where: { account_uuid: req.query.uuid } })
    console.log(row)
    if (row.length===0) { return res.status(400).send({ message: `please check article's information.` }); }
    const articleList = row.map((el)=>{
      const payload = {
        article_uuid : el.dataValues.uuid,
        title : el.dataValues.title,
        created_at : el.dataValues.created_at
      }
      return payload
    })
    res.status(200).send({
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
    
    const {title, content, newTag, music_uuid} = req.body
    if(!title || !content || !music_uuid){
      return res.status(400).send({message:`please check article's information.`})
    }

    const musicInfo = await music.findOne({where:{uuid:req.body.music_uuid}})
    
    

    const created = await article.create({
      uuid:uuid,
      account_uuid:account_uuid,
      created_at:created_at,
      title:title,
      content:content,
      music_uuid:musicInfo.dataValues.uuid  
    })
    
    if (!created) {
      return res.status(400).send({ message: `please check article's information.` });
    }
    const tag_uuid = v4();
    if(newTag){
      await tag.create({uuid:tag_uuid, title:newTag}).then(data=>{
      console.log(data)
      })
      await article_tag.create({article_uuid:uuid,tag_uuid:tag_uuid})
    }
    
        

    res.status(201).send({
      message: 'success!',
      data: {article_uuid:uuid}
    });
    
  }
    
}

