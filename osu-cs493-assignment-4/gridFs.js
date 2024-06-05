const { getDbReference } = require('./lib/mongo')
const { GridFSBucket } = require('mongodb');
const { Readable } = require('stream')
const fs = require('fs')

function uploadToBucket(bucketName, src, dest, metadata, resolve, reject) {
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

async function printThumbnails() {
  const db = getDbReference();
  db.collection('thumbs.files').find({}).toArray((err, documents) => {
    if (err) {
      console.error('Error retrieving documents:', err);
      return;
    }

    console.log('All documents in the collection:');
    documents.forEach((document) => {
      console.log(document);
    });
  });
}

function uploadThumbnail(image, id, dest) {
  return new Promise((resolve, reject) => {
    const db = getDbReference();
    const bucket = new GridFSBucket(db, { bucketName: "thumbs" });

    const uploadStream = bucket.openUploadStreamWithId(
      id,
      dest
    );
    
    Readable.from(image)
      .pipe(uploadStream)
      .on('error', (err) => {
        reject(err);
      })
      .on('finish', (result) => {
        printThumbnails()
        resolve(result._id);
      });
    })
}

exports.uploadThumbnail = uploadThumbnail 
