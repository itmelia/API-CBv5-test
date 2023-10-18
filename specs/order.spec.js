import { createOrder, updateOrder } from '../helpers/order-helper'
import { createClient } from '../helpers/client-helper'
import { createService } from '../helpers/service-helper'
import { createVendor } from '../helpers/vendor-helper'
import { expect } from 'chai'
import request from 'supertest'

const chance = require('chance').Chance()

describe('Order tests', () => {
  describe('Create order', () => {
    let clientId, serviceId, res
    before(async () => {
      clientId = await createClient().body.payload
      serviceId = await createService().body.payload

      res = await createOrder(clientId, serviceId)
    })

    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).include('created')
    })

    describe('Order update', () => {
      let clientId, serviceId, orderId

      before(async () => {
        clientId = await createClient().body.payload
        serviceId = await createService().body.payload

        orderId = await createOrder(clientId, serviceId).body.payload
      })

      it('check the status code', () => {
        expect(updateOrder.statusCode).to.eq(200)
      })

      it('check the response message', () => {
        expect(updateOrder.body.message).include('updated')
      })
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
})
