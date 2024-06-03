/*
 * Photo schema and data accessor methods.
 */

const { ObjectId } = require('mongodb')

const { getDbReference } = require('../lib/mongo')
const { extractValidFields } = require('../lib/validation')

/*
 * Schema describing required/optional fields of a photo object.
 */
const PhotoSchema = {
  file: { require: true},
  businessId: { required: true },
  caption: { required: false }
}
exports.PhotoSchema = PhotoSchema

exports.saveImageInfo = async (image) => {
  const db = getDbReference();
  const collection = db.collection('photos');
  const result = await collection.insertOne(image);
  return result.insertedId;
}

exports.getImageInfoById = async (id) => {
  const db = getDbReference();
  const collection = db.collection('images');

  if (!ObjectId.isValid(id)) {
    return null;
  } else {
    const results = await collection
      .find({ _id: new ObjectId(id) })
      .toArray();
    return results[0];
  }
}
