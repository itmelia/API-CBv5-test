import request from 'supertest'
const chance = require('chance').Chance()

function createOrder(clientId, serviceId) {
  const randomNumFirst = Math.floor(Math.random() * 10000)
  const randomNumSecond = Math.floor(Math.random() * 10000)
  const randomNumThird = Math.floor(Math.random() * 10000)

  return request(process.env.BASE_URL)
    .post('/v5/order')
    .send({
      client: clientId,
      service: serviceId,
      clientPrice: randomNumFirst,
      clientPaid: randomNumSecond,
      vendorPrice: randomNumThird,
      vendorPaid: randomNumThird,
      notes: 'First Order',
    })
    .set('Authorization', process.env.TOKEN)
}

function updateOrder(orderId) {
  const randomNumFirst = Math.floor(Math.random() * 10000)
  const randomNumSecond = Math.floor(Math.random() * 10000)
  const randomNumThird = Math.floor(Math.random() * 10000)
  return request(process.env.BASE_URL)
    .patch('/v5/order/' + orderId)
    .send({
      clientPrice: randomNumFirst,
      clientPaid: randomNumSecond,
      vendorPrice: randomNumThird,
      vendorPaid: randomNumThird,
    })
    .set('Authorization', process.env.TOKEN)
}
export { createOrder, updateOrder }
