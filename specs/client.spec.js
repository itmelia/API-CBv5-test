import { createClient } from '../helpers/client-helper'
import { expect } from 'chai'
//import request from 'supertest'
import { login } from '../helpers/general-helper'
import request from 'supertest'

const chance = require('chance').Chance()

describe('Client', () => {
  const randomEmail = 'user_' + Date.now() + '@gmail.com'
  let id, clientName

  before(async () => {
    await login(process.env.EMAIL, process.env.PASSWORD)
  })

  it('Client creation', async () => {
    const newClient = await createClient(
      chance.name(),
      chance.phone(),
      randomEmail,
      chance.word()
    )

    //id = newClient.body.payload

    expect(newClient.statusCode).to.eq(200)
    expect(newClient.body.message).include('created')
  })

  it('update the client`s data', async () => {
    const clientUpdate = await request(process.env.BASE_URL)
      .patch('/v5/client/' + id)
      .send({ randomEmail })
      .set('Authorization', process.env.TOKEN)

    expect(clientUpdate.statusCode).to.eq(200)
    expect(clientUpdate.body.message).include('updated')
  })

  it('get client by ID', async () => {
    const clientById = await request(process.env.BASE_URL)
      .get('/v5/client/' + process.env.ID)
      .set('Authorization', process.env.TOKEN)

    expect(clientById.statusCode).to.eq(200)
    expect(clientById.body.message).to.eq('Get Client by id ok')
    expect(clientById.body).to.be.a('object')

    clientName = clientById.body.payload.name
    //console.log(clientName)
  })

  it('should get a client by name', async () => {
    const clientByName = await request(process.env.BASE_URL)
      .post('/v5/client/search')
      .send({ clientName })
      .set('Authorization', process.env.TOKEN)

    expect(clientByName.statusCode).to.eq(200)
    expect(clientByName.body.message).include('ok')
  })

  it('should find all clients', async () => {
    const getAllClients = await request(process.env.BASE_URL)
      .post('/v5/client/search')
      .set('Authorization', process.env.TOKEN)

    expect(getAllClients.statusCode).to.eq(200)
    expect(getAllClients.body.message).include('ok')
  })
})
