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

    const currentTag = await article_tag.findOne({where:{article_uuid:req.params.uuid}}).then((data)=>{
      if(!data) return
      else {
        return tag.findOne({where:{uuid:data.dataValues.tag_uuid}})
      }
       
    })
    const payload = {
        title: row.dataValues.title,
        content: row.dataValues.content,
        music_title: musicInfo.dataValues.title,
        music_centent: musicInfo.dataValues.content,
        created_at: row.dataValues.created_at,
        currentTag:currentTag
    }
        
    res.status(200).send({
      message:'success!',
      data:payload
    })
    
    
  },
  patch: async (req, res) => {
    const auth = verifyAccessToken(req);
    if (!auth.verified ) {
      return res.status(401).send({ message: 'please check your token.' });
    }
    const row = await article.findOne({ where: { uuid: req.params.uuid } })
    if (!row) { return res.status(400).send({ message: `please check article's information.` }); }

    const {title, content, music_uuid, newTag } = req.body
    if(!title && !content && !music_uuid && !newTag){
      return res.status(400).send({message: `please check article's information.`})
    }

    const musicInfo = await music.findOne({where:{uuid:req.body.music_uuid}})
    if (!musicInfo) { return res.status(400).send({ message: `please check article's uuid.` }); }  



    const updated = article.update({
      title:title,
      content:content,
      music_uuid:music_uuid
    }, {where:{uuid:req.params.uuid}})
    
    console.log(newTag)
    const tagUpdated = await article_tag.findOne({where:{article_uuid:req.params.uuid}})
    if(!tagUpdated){
      const tag_uuid = v4();
      tag.create({uuid:tag_uuid, title:newTag})
      article_tag.create({article_uuid:req.params.uuid, tag_uuid:tag_uuid})
    }else{
      tag.update({title:newTag}, {where:{uuid:tagUpdated.dataValues.tag_uuid}})
    }
    
    res.status(200).send({message:'success!', data:{article_uuid:req.params.uuid}})
    


    
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

