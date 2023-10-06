import { createClient } from '../helpers/client-helper'
import { expect } from 'chai'
//import request from 'supertest'
import { login } from '../helpers/general-helper'
import request from 'supertest'

const chance = require('chance').Chance()

describe('Client', () => {
  const randomEmail = 'user_' + Date.now() + '@gmail.com'

  before(async () => {
    await login(process.env.EMAIL, process.env.PASSWORD)
    const res = await createClient(
      chance.name(),
      chance.phone(),
      randomEmail,
      chance.word()
    )

    const id = res.body.payload
    console.log(id)
  })

  it('Client creation', async () => {
    //const randomEmail = 'user_' + Date.now() + '@gmail.com'
    //await login(process.env.EMAIL, process.env.PASSWORD)
    const newClient = await createClient(
      chance.name(),
      chance.phone(),
      randomEmail,
      chance.word()
    )

    expect(newClient.statusCode).to.eq(200)
    expect(newClient.body.message).include('created')
  })

  it('update the client`s data', async () => {
    await login(process.env.EMAIL, process.env.PASSWORD)
    const res = await createClient(
      chance.name(),
      chance.phone(),
      randomEmail,
      chance.word()
    )

    const id = res.body.payload
    console.log(id)

    const clientUpdate = await request(process.env.BASE_URL)
      .patch('/v5' + id)
      .send({ email })
      .set('Authorization', process.env.TOKEN)

    expect(clientUpdate.body.message).include('updated')
  })
})
