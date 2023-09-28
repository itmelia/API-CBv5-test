import { expect } from 'chai'
import { register } from '../helpers/general-helper'
const chance = require('chance').Chance()

describe('Create a user with valid credentials', () => {
  let res
  const newEmail = 'user_' + Date.now() + '@pirate.com'

  before(async () => {
    res = await register(
      chance.first(),
      chance.last(),
      newEmail,
      process.env.PASSWORD
    )
  })

  it('verify response status code', async () => {
    expect(res.statusCode).to.eq(201)
  })

  it('verify response message', () => {
    expect(res.body.message).contain('User created successfully')
  })

  it('verify success status', () => {
    expect(res.body.success).to.be.a('boolean')
  })

  it('verify response body is an object', () => {
    expect(res.body).to.be.a('object')
  })
})

describe('User registration', () => {
  let response
  before(async () => {
    response = await register(
      chance.first(),
      chance.last(),
      process.env.PASSWORD
    )
  })

  it('verify response status code', async () => {
    expect(response.statusCode).to.eq(400)
  })
})
