import request from 'supertest'
const chance = require('chance').Chance()

function createOrder(
  client = process.env.ID,
  service = process.env.SERVICE_ID,
  clientPrice = Math.floor(Math.random() * 10000),
  clientPaid = Math.floor(Math.random() * 10000),
  vendorPrice = Math.floor(Math.random() * 10000),
  vendorPaid = Math.floor(Math.random() * 10000),
  description = chance.sentence()
) {
  return request(process.env.BASE_URL)
    .post('/v5/order')
    .send({
      client,
      service,
      clientPrice,
      clientPaid,
      vendorPrice,
      vendorPaid,
      description,
    })
    .set('Authorization', process.env.TOKEN)
}

export { createOrder }
