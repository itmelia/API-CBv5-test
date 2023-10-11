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

export { createVendor }
