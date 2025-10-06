import express from 'express';
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 600 });
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const cacheKey = 'docker-page';
  const cachedPage = cache.get(cacheKey);
  
  if (cachedPage) {
    console.log("page en cachee");
    return res.send(cachedPage);
  }

  res.render('docker', { title: 'Express' },(err , html) => {
    if (err) {
      return next(err);
    }
    console.log("mise en cache");
    cache.set(cacheKey, html);
    res.send(html);
  });
});

export default router;