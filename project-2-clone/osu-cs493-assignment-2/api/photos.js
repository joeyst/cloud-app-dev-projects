const router = require('express').Router();

const photos = require('../data/photos');

const { postPhoto, getPhoto, putPhoto, deletePhoto } = require('../db/crud.js')

exports.router = router;
exports.photos = photos;

router.post('/', postPhoto)
router.get('/:photoID', getPhoto)
router.put('/:photoID', putPhoto);
router.delete('/:photoID', deletePhoto)
