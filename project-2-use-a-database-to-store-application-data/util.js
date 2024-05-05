
function getAttributeValidator(attrs) {
  return (req, res, next) => {
    if (hasAll(req.body, attrs)) {
      next()
    } else {
      res.status(400).send(`Missing keys: ${getAllNotIn(Object.keys(req.body), attrs)}`)
    }
  }
}

function hasAll(obj, attrs) {
  /* Returns whether obj has all attrs. */
  // The following line was adapted from "Object.keys(obj).every(attr => attr in ['attr1', 'attr2'])",
  // which was Claude 3 Opus's response to a prompt of mine. 
  return attrs.every(attr => attr in obj) 
}

function getAllNotIn(arr1, arr2) {
  // The following line is [almost] verbatim from Claude 3 Opus: 
  return arr1.filter(item => !arr2.includes(item))
}

module.exports = {
  getAttributeValidator: getAttributeValidator 
}
