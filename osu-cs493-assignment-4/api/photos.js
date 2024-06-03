/*
 * API sub-router for businesses collection endpoints.
 */

const { Router } = require('express')

const {
  PhotoSchema,
  saveImageInfo,
  getImageInfoById
} = require('../models/photo')

const { getChannel } = require('../../rabbitmq')

const multer = require('multer')
const imageTypes = ["image/jpeg", "image/png"]
const upload = multer({
  storage: multer.diskStorage({ destination: `${__dirname}/uploads` }),
  filename: (req, file, callback) => { 
    const filename = crypto.pseudoRandomBytes(16).toString('hex');
    const extension = imageTypes[file.mimetype];
    callback(null, `${filename}.${extension}`);
  },
  fileFilter: (req, file, callback) => {
    callback(null, !!imageTypes[file.mimetype]);
  }
});

const router = Router()

/*
 * POST /photos - Route to create a new photo.
 */
router.post('/', upload.single('file'), async (req, res) => {
  if (req.file && req.body && req.body.userId) {
    try {
      const image = {
        contentType: req.file.mimetype,
        filename: req.file.filename,
        path: req.file.path,
        userId: req.body.userId
      };
      const id = await saveImageFile(image);
      const channel = getChannel();
      channel.sendToQueue('images', Buffer.from(id.toString()));
      await removeUploadedFile(req.file);
      res.status(200).send({ id: id });
    } catch (err) {
      next(err);
    }
  } else {
    res.status(400).send({
      err: "Request body needs'image' file and 'userId'."
    });
  }
})

/*
 * GET /photos/{id} - Route to fetch info about a specific photo.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const image = await getImageInfoById(req.params.id);
    if (image) {
      delete image.path;
      image.url = `/media/images/${image.filename}`;
      const responseBody = {
        _id: image._id,
        url: `/media/images/${image.filename}`,
        contentType: image.metadata.contentType,
        userId: image.metadata.userId,
      };
      res.status(200).send(responseBody);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
})

app.get('/media/images/:filename', (req, res, next) => {
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
