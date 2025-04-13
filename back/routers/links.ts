import express from 'express';
import Link from '../models/Link';
import { error, log } from 'console';
const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];

const linkRouter = express.Router();

// linkRouter.get('/', async(req, res, next)=>{
//     try{
//         const links = await Link.find();
//         res.status(200).json(links);
//     }catch(e){
//         next(e)
//     }
// });

linkRouter.get('/:id', async(req, res, next)=>{
    const id = req.params.id;
    try{
        const oneLink = await Link.find({shortUrl: id});
        if(!oneLink){
            res.status(404).send({error:"No link found"})
        }
        res.status(301).redirect(`${oneLink[0].originalUrl}`)

    }catch(e){
        next(e)
    }
})


linkRouter.post("/", async(req, res, next)=>{
    try{
        let uniqueUrl;

        while (!uniqueUrl) {
          let randomUrl = '';
          for (let i = 0; i < 6; i++) {
            let randomAlp = Math.floor(Math.random() * alphabet.length);
            randomUrl += Math.floor(Math.random() * 2)
              ? alphabet[randomAlp].toLowerCase()
              : alphabet[randomAlp].toUpperCase();
          }
          const link = await Link.find({ shortUrl: randomUrl });
          if (link.length === 0) {
            uniqueUrl = randomUrl;
            break;
          }
        }

        const newLink = {
          shortUrl: uniqueUrl,
          originalUrl: req.body.originalUrl,
        };

        const link = new Link(newLink);
        await link.save();
        res.status(200).send(link);
    }catch(e){
        next(e)
    }
})

export default linkRouter;