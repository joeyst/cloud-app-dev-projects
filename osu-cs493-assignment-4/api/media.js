
/*
 * API sub-router for media endpoints. 
 */

const { Router } = require('express')
const { getImageDownloadStreamByFilename } = require('../models/photo')

const router = Router()

router.get('/media/images/:filename', (req, res, next) => {
  getImageDownloadStreamByFilename(req.params.filename)
    .on('file', (file) => {
      res.status(200).type(file.metadata.contentType);
    })
    .on('error', (err) => {
      if (err.code === 'ENOENT') {
        next();
      } else {
        next(err);
      }
    })
    .pipe(res);
});

module.exports = router
