const { Business, Review, Photo } = require('./models.js')

function postBusiness(req, res) {
  new Business(req.body).save(err => {
    if (err) {
      res.status(400).send()
    } else {
      console.log("Business saved!")
      res.status(200).send()
    }
  })
}

async function getBusiness(req, res) {
  return await Business.findById(req.params.businessId)
}

async getBusinessData(req, res) {
  return {
    business: getBusiness(req, res),
    reviews: Review.find({businessId: req.params.businessId}),
    photos: Photo.find({businessId: req.params.businessId}),
  }
}

async function putBusiness(req, res) {
  res.send(await Business.findByIdAndUpdate(req.params.businessId, req.body, { new: true }))
}

async function deleteBusiness(req, res) {
  await Business.findByIdAndDelete(req.params.businessId)
  res.send("Business deleted!")
}

async function getBusinessList(req, res) {
  await Business.find().then((instances) => res.send(instances))
}

module.exports = {
  postBusiness: postBusiness,       // /
  getBusiness: getBusiness,         // /:BusinessID
  putBusiness: putBusiness,         // /:BusinessID
  deleteBusiness: deleteBusiness,   // /:BusinessID
  getBusinessList: getBusinessList, // / 
}