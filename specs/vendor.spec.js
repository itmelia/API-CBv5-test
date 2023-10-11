import { createVendor } from '../helpers/vendor-helper'
import { expect } from 'chai'
import { login } from '../helpers/general-helper'
import request from 'supertest'
const chance = require('chance').Chance()

describe('Vendor', () => {
  //const randomEmail = 'vendor_' + Date.now() + '@gmail.com'

  it('should create a new vendor', async () => {
    const newVendor = await createVendor()

    expect(newVendor.statusCode).to.eq(200)
    expect(newVendor.body.message).include('created')
  })

  it('should update the vendor', async () => {
    const updateVendor = await request(process.env.BASE_URL)
      .patch('/v5/vendor/' + process.env.VENDOR_ID)
      .send({
        email: chance.email(),
      })
      .set('Authorization', process.env.TOKEN)

    expect(updateVendor.statusCode).to.eq(200)
    expect(updateVendor.body.message).include('updated')
  })

  it('should get the vendor by id', async () => {
    const getById = await request(process.env.BASE_URL)
      .get('/v5/vendor/' + process.env.VENDOR_ID)
      .set('Authorization', process.env.TOKEN)

    expect(getById.statusCode).to.eq(200)
    expect(getById.body.message).to.eq('Get Vendor by id ok')
  })

  it('should return all vendors', async () => {
    const allVendors = await request(process.env.BASE_URL)
      .post('/v5/vendor/search')
      .set('Authorization', process.env.TOKEN)

    expect(allVendors.statusCode).to.eq(200)
    expect(allVendors.body.message).include('ok')
  })

  it('should delete the vendor', async () => {
    const deleteVendor = await request(process.env.BASE_URL)
      .delete('/v5/vendor/' + process.env.VENDOR_ID)
      .set('Authorization', process.env.TOKEN)

    expect(deleteVendor.statusCode).to.eq(200)
    expect(deleteVendor.body.message).include('deleted')
  })
})
