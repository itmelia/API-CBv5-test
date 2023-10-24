import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from '../helpers/order-helper'
import { createClient } from '../helpers/client-helper'
import { createService } from '../helpers/service-helper'
import { createVendor } from '../helpers/vendor-helper'
import { expect } from 'chai'
import { log } from 'mochawesome/src/utils'

const chance = require('chance').Chance()

describe('Order tests', () => {
  describe('Create order', () => {
    let clientId, serviceId, vendorId, res
    before(async () => {
      clientId = (await createClient()).body.payload
      vendorId = (await createVendor()).body.payload
      serviceId = (await createService(vendorId)).body.payload

      res = await createOrder(clientId, serviceId)
    })

    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).include('created')
    })

    describe('Order update', () => {
      let clientId, serviceId, orderId, vendorId, res

      before(async () => {
        clientId = (await createClient()).body.payload
        vendorId = (await createVendor()).body.payload
        serviceId = (await createService(vendorId)).body.payload

        orderId = (await createOrder(clientId, serviceId)).body.payload
        res = await updateOrder(orderId)
      })

      it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
      })

      it('check the response message', () => {
        expect(res.body.message).include('updated')
      })
    })

    describe('Get order by id', () => {
      let clientId, vendorId, serviceId, orderId, res
      before(async () => {
        clientId = (await createClient()).body.payload
        vendorId = (await createVendor()).body.payload
        serviceId = (await createService(vendorId)).body.payload

        orderId = (await createOrder(clientId, serviceId)).body.payload
        res = await getOrderById(orderId)
      })

      it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
      })

      it('check the response message', () => {
        expect(res.body.message).include('ok')
      })
    })

    describe('Get all orders', () => {
      let res
      before(async () => {
        res = await getAllOrders()
      })
      it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
      })

      it('check the response message', () => {
        expect(res.body.message).include('ok')
      })
    })

    describe('Delete the order', () => {
      let clientId, serviceId, res
      before(async () => {
        clientId = (await createClient()).body.payload
        let vendorId = (await createVendor()).body.payload
        serviceId = (await createService(vendorId)).body.payload

        const orderId = (await createOrder(clientId, serviceId)).body.payload
        res = await deleteOrder(orderId)

        //console.log(serviceId)
      })

      it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
      })

      it('check the response message', () => {
        expect(res.body.message).include('deleted')
      })
    })
  })
})
