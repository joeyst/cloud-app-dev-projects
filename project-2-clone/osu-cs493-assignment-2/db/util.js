
async function getInstancesAsJSON(modelType, condition) {
  return await modelType.find(condition).then(instances => instances.map(instance => instance.toJSON()))
}

async function convertInstancesAsJSON(instances) {
  return instances.map(instance => instance.toJSON())
}

module.exports = {
  getInstancesAsJSON: getInstancesAsJSON,
  convertInstancesAsJSON: convertInstancesAsJSON
}