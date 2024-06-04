const { getDbReference } = require('./lib/mongo')
const { GridFSBucket } = require('mongodb');

export function uploadToBucket(bucketName, src, dest, metadata) {
  const db = getDbReference();
  const bucket = new GridFSBucket(db, { bucketName: bucketName });

  bucket.openUploadStream(
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