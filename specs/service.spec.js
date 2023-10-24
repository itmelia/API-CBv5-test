import { createVendor } from '../helpers/vendor-helper'

const chance = require('chance').Chance()
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  getServiceByVendor,
  updateService,
} from '../helpers/service-helper'
import { expect } from 'chai'
import request from 'supertest'

describe('Service tests', () => {
  describe('Create a service', () => {
    let vendorId, res
    before(async () => {
      vendorId = (await createVendor()).body.payload

      res = await createService(vendorId)
    })

    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).to.eq('Service created')
    })
  })

  describe('Update the service', () => {
    let serviceId, serviceName, updatedServiceName, res
    before(async () => {
      serviceId = (await createService()).body.payload
      serviceName = (await getServiceById()).body.payload.name

      res = await updateService(serviceId)
      updatedServiceName = (await getServiceById(serviceId)).body.payload.name
    })
    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).to.eq('Service updated')
    })
  })

  describe('Get the service by ID', () => {
    let serviceId, res
    before(async () => {
      serviceId = (await createService()).body.payload

      res = await getServiceById(serviceId)
    })
    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).include('ok')
    })
  })

  describe('Get all services', () => {
    let res
    before(async () => {
      res = await getAllServices()
    })
    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).include('ok')
    })
  })

  describe('Get the service by vendor', () => {
    let vendorId, res
    before(async () => {
      vendorId = (await createVendor()).body.payload
      res = await getServiceByVendor(vendorId)
    })
    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).to.eq('Service Search ok')
    })
  })

  describe('Delete the service', () => {
    let serviceId, res
    before(async () => {
      serviceId = (await createService()).body.payload
      res = await deleteService(serviceId)
    })
    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).include('deleted')
    })
  })
})
