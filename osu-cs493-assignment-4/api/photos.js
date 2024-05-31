/*
 * API sub-router for businesses collection endpoints.
 */

const { Router } = require('express')

const { validateAgainstSchema } = require('../lib/validation')
const {
  PhotoSchema,
  insertNewPhoto,
  getPhotoById
} = require('../models/photo')
// const upload = multer({ "dest": `${__dirname}/uploads`})
const multer = require('multer')
const upload = multer({ storage: multer.diskStorage({ destination: `${__dirname}/uploads` }) })

const router = Router()

const imageTypes = ["image/jpeg", "image/png"]
async function validateIsImage(req, res, next) {
  if (!imageTypes.includes(req.body.file.mimetype)) {
    res.status(400).send(`Invalid file type ${req.body.file.mimetype}`)
  }
  next()
}

/*
 * POST /photos - Route to create a new photo.
 */
router.post('/', upload.single('file'), validateIsImage, async (req, res) => {
  if (validateAgainstSchema(req.body, PhotoSchema)) {
    try {
      const id = await insertNewPhoto(req.body)
      res.status(201).send({
        id: id,
        links: {
          photo: `/photos/${id}`,
          business: `/businesses/${req.body.businessId}`
        }
      })
    } catch (err) {
      console.error(err)
      res.status(500).send({
        error: "Error inserting photo into DB.  Please try again later."
      })
    }
  } else {
    res.status(400).send({
      error: "Request body is not a valid photo object"
    })
  }
})

/*
 * GET /photos/{id} - Route to fetch info about a specific photo.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const photo = await getPhotoById(req.params.id)
    if (photo) {
      res.status(200).send(photo)
    } else {
      next()
    }
  } catch (err) {
    console.error(err)
    res.status(500).send({
      error: "Unable to fetch photo.  Please try again later."
    })
  }
})

module.exports = router
