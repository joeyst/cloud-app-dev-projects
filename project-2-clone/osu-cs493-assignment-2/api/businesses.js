const router = require('express').Router();

const businesses = require('../data/businesses');
const { Business } = require('../db/models');

const { postBusiness, getBusinessData, putBusiness, deleteBusiness, getInstancesAsJSON } = require('../db/crud.js')

exports.router = router;
exports.businesses = businesses;

router.get('/', async function (req, res) {
  let page = parseInt(req.query.page) || 1;
  const numPerPage = 10;
  const lastPage = Math.ceil(businesses.length / numPerPage);
  page = page > lastPage ? lastPage : page;
  page = page < 1 ? 1 : page;

  // Getting business documents where ID is in page. 
  // const businessIndices = [...Array(numPerPage).keys().map(i => (i+((page - 1)*numPerPage)))]//.toString())]
  const businessList = await Business.find().skip((page - 1)*numPerPage).limit(numPerPage) 
  // const condition = {'_id': {$in: businessIndices}}
  // const businessList = await getInstancesAsJSON(Business, condition)

  /*
   * Generate HATEOAS links for surrounding pages.
   */
  const links = {};
  if (page < lastPage) {
    links.nextPage = `/businesses?page=${page + 1}`;
    links.lastPage = `/businesses?page=${lastPage}`;
  }
  if (page > 1) {
    links.prevPage = `/businesses?page=${page - 1}`;
    links.firstPage = '/businesses?page=1';
  }

  /*
   * Construct and send response.
   */
  res.status(200).json({
    businesses: businessList,
    pageNumber: page,
    totalPages: lastPage,
    pageSize: numPerPage,
    totalCount: businessList.length,
    links: links
  });

});

router.post('/', postBusiness)

router.get('/:businessid', getBusinessData)

router.put('/:businessid', putBusiness)

router.delete('/:businessid', deleteBusiness)
