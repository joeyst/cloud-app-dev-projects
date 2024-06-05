/*
 * API sub-router for businesses collection endpoints.
 */

const { Router } = require('express')

const {
  PhotoSchema,
  saveImageInfo,
  saveImageFile,
  getImageInfoById,
  getImageDownloadStreamByFilename,
  removeUploadedFile
} = require('../models/photo')

const crypto = require('crypto')

const { sendIdToQueue } = require('../rabbitmq')

const multer = require('multer')
const imageTypes = ["image/jpeg", "image/png"]
const imageFileTypes = ["jpeg", "png"]
const upload = multer({
  storage: multer.diskStorage({ destination: `${__dirname}/uploads` }),
  filename: (req, file, callback) => { 
    const filename = crypto.pseudoRandomBytes(16).toString('hex');
    const extension = imageFileTypes[imageTypes.indexOf(file.mimetype)];
    console.log(`FILE: ${JSON.stringify(file)}`)
    callback(null, `${filename}.${extension}`);
  },
  fileFilter: (req, file, callback) => {
    callback(null, imageTypes.includes(file.mimetype));
  }
});

const router = Router()

/*
 * POST /photos - Route to create a new photo.
 */
router.post('/', upload.single('file'), async (req, res, next) => {
  console.log(`file: ${JSON.stringify(req.file)}`)
  console.log(`body: ${JSON.stringify(req.body)}`)
  if (req.file && req.body && req.body.businessId) {
    try {
      const image = {
        contentType: req.file.mimetype,
        filename: req.file.filename,
        path: req.file.path,
        businessId: req.body.businessId
      };
      const id = await saveImageFile(image);
      console.log("PASSED saveImageFile.")
      await sendIdToQueue(id)
      console.log("SENT TO QUEUE.")
      await removeUploadedFile(req.file);
      console.log("REMOVED UPLOADED FILE.")
      res.status(200).send({ id: id });
      console.log("SENT UPLOADED FILE.")
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
        thumbnailUrl: `/media/thumbs/${image.filename}`,
        contentType: image.metadata.contentType,
        businessId: image.metadata.businessId,
      };
      res.status(200).send(responseBody);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
})

module.exports = router
