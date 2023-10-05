import { expect } from 'chai'

const chance = require('chance').Chance()
import { login, register } from '../helpers/general-helper'
import request from 'supertest'

describe('Extra spaces when registering', () => {
  it('trimming extra spaces', async () => {
    const newEmail = '      ' + Date.now() + '@gmail.com'

    await register(
      chance.first(),
      chance.last(),
      newEmail,
      process.env.PASSWORD
    )

    const response = await login(newEmail, process.env.PASSWORD)

    expect(response.statusCode).to.eq(200)
    expect(response.body.payload.user.email).to.eq(newEmail.trim())
  })
})

describe('Extra space trimming', () => {
  it('extra spaces are deleted', async () => {
    const newEmail = '         elmiller@gmail.com'

    const res = await login(newEmail, process.env.PASSWORD)

    //console.log(res.body)

    expect(newEmail.trim()).to.equal(res.body.payload.user.email)

    //console.log(res.body.payload.user.email)
  })
})

describe('New client with extra spaces in the name field', () => {
  it('extra spaces trimming', async () => {
    await login(process.env.EMAIL, process.env.PASSWORD)

    const name = '        ' + chance.first()

    const newClient = await request(process.env.BASE_URL)
      .post('/v5/client')
      .send({ name: name })
      .set('Authorization', process.env.TOKEN)

    //console.log(res.body)
    expect(newClient.statusCode).to.eq(200)
    expect(newClient.body.message).to.include('created')

    // const id = newClient.body.payload
    // console.log(id)

    const searchClient = await request(process.env.BASE_URL)
      .post('/v5/client/search')
      .send(name)
      .set('Authorization', process.env.TOKEN)

    //expect(newClient.body.payload).to.be.a('string')
    const clientName = searchClient.body.payload.items[0].name
    expect(clientName).to.eq(clientName.trim())
  })
})
