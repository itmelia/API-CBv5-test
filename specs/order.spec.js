import { createOrder } from '../helpers/order-helper'
import { expect } from 'chai'
import request from 'supertest'
const chance = require('chance').Chance()

describe('Order', () => {
  it('should create a new order', async () => {
    const newOrder = await createOrder()

    expect(newOrder.statusCode).to.eq(200)
    expect(newOrder.body.message).include('created')
  })

  it('should update the order', async () => {
    const updateOrder = await request(process.env.BASE_URL)
      .patch('/v5/order/' + process.env.ORDER_ID)
      .send({
        client: process.env.ID,
        service: process.env.SERVICE_ID,
        clientPrice: '220',
        clientPaid: '200',
        vendorPrice: '230',
        vendorPaid: '200',
        description: 'There are some changes in price',
      })
      .set('Authorization', process.env.TOKEN)

    expect(updateOrder.statusCode).to.eq(200)
    expect(updateOrder.body.message).include('updated')
  })

  it('should get an order by id', async () => {
    const getById = await request(process.env.BASE_URL)
      .get('/v5/order/' + process.env.ORDER_ID)
      .set('Authorization', process.env.TOKEN)

    expect(getById.statusCode).to.eq(200)
    expect(getById.body.message).include('ok')
  })

  it('should get all orders', async () => {
    const allOrders = await request(process.env.BASE_URL)
      .post('/v5/order/search')
      .set('Authorization', process.env.TOKEN)

    expect(allOrders.statusCode).to.eq(200)
    expect(allOrders.body.message).include('ok')
  })

  it('should delete the order', async () => {
    const deleteOrder = await request(process.env.BASE_URL)
      .delete('/v5/order/' + process.env.ORDER_ID)
      .set('Authorization', process.env.TOKEN)

    expect(deleteOrder.statusCode).to.eq(200)
    expect(deleteOrder.body.message).include('deleted')
  })
})
