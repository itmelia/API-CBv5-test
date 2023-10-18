import {
  createVendor,
  deleteVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
} from '../helpers/vendor-helper'
import { expect } from 'chai'
const chance = require('chance').Chance()

describe('Vendor tests', () => {
  describe('Create a vendor', () => {
    let res

    before(async () => {
      res = await createVendor()
    })
    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).include('created')
    })
  })

  describe('Update the vendor', () => {
    let vendorId, vendorName, updatedVendorName, res

    before(async () => {
      vendorId = (await createVendor()).body.payload
      vendorName = (await getVendorById(vendorId)).body.payload.name

      res = await updateVendor(vendorId)
      updatedVendorName = (await getVendorById(vendorId)).body.payload.name
    })

    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).include('updated')
    })
  })

  describe('Get vendor by ID', () => {
    let vendorId, res

    before(async () => {
      vendorId = (await createVendor()).body.payload
      res = await getVendorById(vendorId)
    })

    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).to.eq('Get Vendor by id ok')
    })
  })

  describe('Get all vendors', () => {
    let res

    before(async () => {
      res = await getAllVendors()
    })
    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).include('ok')
    })
  })

  describe('Delete the vendor', () => {
    let vendorId, res
    before(async () => {
      vendorId = (await createVendor()).body.payload
      res = await deleteVendor(vendorId)
    })
    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).include('deleted')
    })
  })
})
