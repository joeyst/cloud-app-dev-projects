const { Business, Review, Photo, getBusinessDocument } = require('./models.js')
const { getInstancesAsJSON, convertInstancesAsJSON } = require('./util.js')

async function postBusiness(req, res) {
  try {
  res.status(200).send(getBusinessDocument(req).save())
  }
  catch (err) {
    console.log(`ERROR: ${err}`)
  }
}

async function getBusiness(req, res) {
  return await Business.findById(req.params.businessId).then(instance => instance?.toJSON())
}

async function getBusinessData(req, res) {
  const businessId = req.params.businessId 
  res.status(200).send ({
    business: await getBusiness(req, res),
    reviews: await getInstancesAsJSON(Review, {businessId}),
    photos: await getInstancesAsJSON(Photo, {businessId})
  })
}

async function putBusiness(req, res) {
  res.status(200).send(await Business.findByIdAndUpdate(req.params.businessId, req.body, { new: true }).then(instance => instance?.toJSON()))
}

async function deleteBusiness(req, res) {
  await Business.findByIdAndDelete(req.params.businessId)
  res.status(200).send("Business deleted!")
}

async function getBusinessList(req, res) {
  res.status(200).send(await Business.find().then(instances => instances.map(instance => instance.toJSON())))
}

module.exports = {
  postBusiness: postBusiness,       // /
  getBusiness: getBusiness,         // /:BusinessID
  getBusinessData: getBusinessData, // /:BusinessID
  putBusiness: putBusiness,         // /:BusinessID
  deleteBusiness: deleteBusiness,   // /:BusinessID
  getBusinessList: getBusinessList, // / 
}