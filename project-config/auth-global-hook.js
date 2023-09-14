import request from 'supertest'
import 'dotenv/config'
import { login } from '../helpers/general-helper'

before(async () => {
  const response = await login(process.env.EMAIL, process.env.PASSWORD)

  process.env.TOKEN = response.body.payload.token
})
