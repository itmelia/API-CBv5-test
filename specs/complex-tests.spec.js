import { register } from '../helpers/general-helper'
import request from 'supertest'
const chance = require('chance').Chance()
import { expect } from 'chai'
import { login } from '../helpers/general-helper'
describe('Email confirmation', () => {
  let res, string, endPoint, confirmation
  it('verify status code', async () => {
    const randomEmail = 'user_' + Date.now() + '@pirate.com'

    await register(
      chance.first(),
      chance.last(),
      randomEmail,
      process.env.PASSWORD
    )

    res = await login(randomEmail, process.env.PASSWORD)

    expect(res.body.payload.user.roles).to.include('new')

    string = await request(process.env.BASE_URL)
      .post('/email/search')
      .send({ email: randomEmail })

    endPoint = string.body.payload.items[0].message
      .split('\n')[4]
      .split('https://clientbase.us')[1]

    confirmation = await request(process.env.BASE_URL).get(endPoint)

    res = await login(randomEmail, process.env.PASSWORD)

    expect(res.statusCode).to.eq(200)

    expect(res.body.payload.user.roles).to.include('verified')
  })
})
