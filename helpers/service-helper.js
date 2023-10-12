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

export { createService }
