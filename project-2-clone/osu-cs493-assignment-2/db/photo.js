const { Photo } = require('./models.js')

function postPhoto(req, res) {
  new Photo(req.body).save(err => {
    if (err) {
      res.status(400).send()
    } else {
      console.log("Photo saved!")
      res.status(200).send()
    }
  })
}

async function getPhoto(req, res) {
  res.send(await Photo.findById(req.params.photoId))
}

async function putPhoto(req, res) {
  res.send(await Photo.findByIdAndUpdate(req.params.photoId, req.body, { new: true }))
}

async function deletePhoto(req, res) {
  await Photo.findByIdAndDelete(req.params.photoId)
  res.send("Photo deleted!")
}

module.exports = {
  postPhoto: postPhoto,     // /
  getPhoto: getPhoto,       // /:PhotoID
  putPhoto: putPhoto,       // /:PhotoID
  deletePhoto: deletePhoto, // /:PhotoID
}