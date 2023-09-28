import request from 'supertest'
const chance = require('chance').Chance()

function login(email, password) {
  return request(process.env.BASE_URL)
    .post('/v5/user/login')
    .send({ email, password })
}

function register(
  firstName = chance.first(),
  lastName = chance.last(),
  email,
  password = process.env.PASSWORD
) {
  return request(process.env.BASE_URL)
    .post('/v5/user')
    .send({ firstName, lastName, email, password })
}

export { login, register }
