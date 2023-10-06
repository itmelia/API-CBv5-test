import request from 'supertest'
import 'dotenv/config'
import { login } from '../helpers/general-helper'
import { createClient } from '../helpers/client-helper'
const chance = require('chance').Chance()

before(async () => {
  const response = await login(process.env.EMAIL, process.env.PASSWORD)

  process.env.TOKEN = response.body.payload.token
})

before(async () => {
  const res = await createClient(
    chance.name(),
    chance.phone(),
    chance.email(),
    chance.word()
  )
  process.env.ID = res.body.payload
})
