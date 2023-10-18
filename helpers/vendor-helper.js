import request from 'supertest'

const chance = require('chance').Chance()

function createVendor(
  name = chance.name(),
  phone = chance.phone(),
  email = 'vendor_' + Date.now() + '@gmail.com'
) {
  return request(process.env.BASE_URL)
    .post('/v5/vendor')
    .send({ name, phone, email })
    .set('Authorization', process.env.TOKEN)
}

function updateVendor(vendorId, name = chance.first()) {
  return request(process.env.BASE_URL)
    .patch('/v5/vendor/' + vendorId)
    .send({ name })
    .set('Authorization', process.env.TOKEN)
}

function getVendorById(vendorId) {
  return request(process.env.BASE_URL)
    .get('/v5/vendor/' + vendorId)
    .set('Authorization', process.env.TOKEN)
}

function getAllVendors() {
  return request(process.env.BASE_URL)
    .post('/v5/vendor/search')
    .set('Authorization', process.env.TOKEN)
}

function deleteVendor(vendorId) {
  return request(process.env.BASE_URL)
    .delete('/v5/vendor/' + vendorId)
    .set('Authorization', process.env.TOKEN)
}

export {
  createVendor,
  updateVendor,
  getVendorById,
  getAllVendors,
  deleteVendor,
}
