import request from 'supertest'
import 'dotenv/config'
import { login } from '../helpers/general-helper'
import { createClient } from '../helpers/client-helper'
import { createVendor } from '../helpers/vendor-helper'
import { createService } from '../helpers/service-helper'
import { createOrder } from '../helpers/order-helper'

//const chance = require('chance').Chance()

before(async () => {
  const response = await login(process.env.EMAIL, process.env.PASSWORD)

  process.env.TOKEN = response.body.payload.token
})

before(async () => {
  const res = await createClient()

  process.env.ID = res.body.payload
})

before(async () => {
  const vendorId = await createVendor()

  process.env.VENDOR_ID = vendorId.body.payload
})

before(async () => {
  const serviceId = await createService()

  process.env.SERVICE_ID = serviceId.body.payload
})

before(async () => {
  const orderId = await createOrder()

  process.env.ORDER_ID = orderId.body.payload
})
