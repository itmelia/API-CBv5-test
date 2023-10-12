const chance = require('chance').Chance()
import { createService } from '../helpers/service-helper'
import { expect } from 'chai'
import request from 'supertest'

describe('Service', () => {
  it('should create a service', async () => {
    const newService = await createService()

    expect(newService.statusCode).to.eq(200)
    expect(newService.body.message).to.eq('Service created')
  })

  it('should update the service', async () => {
    const updateService = await request(process.env.BASE_URL)
      .patch('/v5/service/' + process.env.SERVICE_ID)
      .send({ name: chance.name() })
      .set('Authorization', process.env.TOKEN)

    expect(updateService.statusCode).to.eq(200)
    expect(updateService.body.message).to.eq('Service updated')
  })

  it('should get the service by ID', async () => {
    const getById = await request(process.env.BASE_URL)
      .get('/v5/service/' + process.env.SERVICE_ID)
      .set('Authorization', process.env.TOKEN)

    expect(getById.statusCode).to.eq(200)
    expect(getById.body.message).include('ok')
  })

  it('should get all services', async () => {
    const getAllServices = await request(process.env.BASE_URL)
      .post('/v5/service/search')
      .set('Authorization', process.env.TOKEN)

    expect(getAllServices.statusCode).to.eq(200)
    expect(getAllServices.body.message).include('ok')
  })

  it('should get the service by vendor', async () => {
    const getByVendor = await request(process.env.BASE_URL)
      .post('/v5/service/search')
      .send({ vendor: process.env.VENDOR_ID })
      .set('Authorization', process.env.TOKEN)

    expect(getByVendor.statusCode).to.eq(200)
    expect(getByVendor.body.message).to.eq('Service Search ok')
  })

  it('should delete the service', async () => {
    const deleteService = await request(process.env.BASE_URL)
      .delete('/v5/service/' + process.env.SERVICE_ID)
      .set('Authorization', process.env.TOKEN)

    expect(deleteService.statusCode).to.eq(200)
    expect(deleteService.body.message).to.eq('Service deleted')
  })
})
