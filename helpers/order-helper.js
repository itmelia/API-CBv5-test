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
      notes: chance.sentence(),
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

function getOrderById(orderId) {
  return request(process.env.BASE_URL)
    .get('/v5/order/' + orderId)
    .set('Authorization', process.env.TOKEN)
}

function getAllOrders() {
  return request(process.env.BASE_URL)
    .post('/v5/order/search')
    .set('Authorization', process.env.TOKEN)
}

function deleteOrder(orderId) {
  return request(process.env.BASE_URL)
    .delete('/v5/order/' + orderId)
    .set('Authorization', process.env.TOKEN)
}
export { createOrder, updateOrder, getOrderById, getAllOrders, deleteOrder }
