const { getDbReference } = require('./lib/mongo')
const { GridFSBucket } = require('mongodb');
const { Readable } = require('stream')

function uploadToBucket(bucketName, src, dest, metadata) {
  const db = getDbReference();
  const bucket = new GridFSBucket(db, { bucketName: bucketName });

  const uploadStream = bucket.openUploadStream(
    dest,
    { metadata: metadata }
  );

  fs.createReadStream(src)
    .pipe(uploadStream)
    .on('error', (err) => {
      reject(err);
    })
    .on('finish', (result) => {
      resolve(result._id);
    });
}

exports.uploadToBucket = uploadToBucket 

function uploadThumbnail(image, dest, metadata) {
  const db = getDbReference();
  const bucket = new GridFSBucket(db, { bucketName: "thumbs" });

  const uploadStream = bucket.openUploadStream(
    dest,
    { metadata: metadata }
  );

  
  Readable.from(image)
    .pipe(uploadStream)
    .on('error', (err) => {
      reject(err);
    })
    .on('finish', (result) => {
      resolve(result._id);
    });
}

exports.uploadThumbnail = uploadThumbnail 
