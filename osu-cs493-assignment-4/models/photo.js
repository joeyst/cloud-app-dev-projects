/*
 * Photo schema and data accessor methods.
 */

const { ObjectId, GridFSBucket } = require('mongodb')
const { getDbReference } = require('../lib/mongo')

/*
 * Schema describing required/optional fields of a photo object.
 */
const PhotoSchema = {
  file: { require: true},
  businessId: { required: true },
  caption: { required: false },
  dimensions: { required: false}
}
exports.PhotoSchema = PhotoSchema

exports.saveImageInfo = async (image) => {
  const db = getDbReference();
  const collection = db.collection('photos');
  const result = await collection.insertOne(image);
  return result.insertedId;
}

exports.saveImageFile = async (image) => {
  return new Promise((resolve, reject) => {
    const metadata = {
      contentType: image.contentType,
      userId: image.userId
    };

    uploadToBucket("images", image.path, image.filename, { metadata: metadata })
  });
}

exports.getImageInfoById = async (id) => {
  const db = getDbReference();
  const bucket = new GridFSBucket(db, { bucketName: 'images' });

  if (!ObjectId.isValid(id)) {
    return null;
  } else {
    const results =
      await bucket.find({ _id: new ObjectId(id) }).toArray();
    return results[0];
  }
}

exports.removeUploadedFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.unlink(file.path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

exports.getImageDownloadStreamByFilename = (filename) => {
  const db = getDbReference();
  const bucket =
    new GridFSBucket(db, { bucketName: 'images' });
  return bucket.openDownloadStreamByName(filename);
}

exports.getDownloadStreamById = (id) => {
  return exports.getImageDownloadStreamByFilename(exports.getImageInfoById(id).filename)
}
