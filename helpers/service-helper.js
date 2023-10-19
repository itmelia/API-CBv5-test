import request from 'supertest'

const chance = require('chance').Chance()

function createService() {
  const vendorPrice = Math.floor(Math.random() * 10000)
  const clientPrice = Math.floor(Math.random() * 10000)

  return request(process.env.BASE_URL)
    .post('/v5/service')
    .send({
      name: 'Service' + Date.now(),
      vendor: process.env.VENDOR_ID,
      vendorPrice,
      clientPrice,
      description: chance.sentence(),
    })
    .set('Authorization', process.env.TOKEN)
}

function updateService(serviceId, name = 'Service' + Date.now()) {
  return request(process.env.BASE_URL)
    .patch('/v5/service/' + serviceId)
    .send({ name })
    .set('Authorization', process.env.TOKEN)
}

function getServiceById(serviceId) {
  return request(process.env.BASE_URL)
    .get('/v5/service/' + serviceId)
    .set('Authorization', process.env.TOKEN)
}

function getAllServices() {
  return request(process.env.BASE_URL)
    .post('/v5/service/search')
    .set('Authorization', process.env.TOKEN)
}

function getServiceByVendor(vendorId) {
  return request(process.env.BASE_URL)
    .post('/v5/service/search')
    .send({ vendorId })
    .set('Authorization', process.env.TOKEN)
}

function deleteService(serviceId) {
  return request(process.env.BASE_URL)
    .delete('/v5/service/' + serviceId)
    .set('Authorization', process.env.TOKEN)
}

export {
  createService,
  updateService,
  getServiceById,
  getAllServices,
  getServiceByVendor,
  deleteService,
}
