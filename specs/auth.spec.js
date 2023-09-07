import { expect } from 'chai'
import request from 'supertest'

describe('Authentication', function () {
  describe('Authentication with valid credentials', function () {
    it('Validate status code', async function () {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'elmiller@gmail.com', password: 'qwerty123' })

      //console.log(res)

      expect(res.statusCode).to.eq(200)
    })

    it('Validate response message', async function () {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'elmiller@gmail.com', password: 'qwerty123' })

      //console.log(res)

      expect(res.body.message).to.eq('Auth success')
    })

    it('Check the token exist', async function () {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'elmiller@gmail.com', password: 'qwerty123' })

      //console.log(res)

      expect(res.body.payload.token).to.be.a('string')
    })

    it('Check the role', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'elmiller@gmail.com', password: 'qwerty123' })

      expect(res.body.payload.user.roles).to.be.an('array')
    })

    it('Check the creation time', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'elmiller@gmail.com', password: 'qwerty123' })

      expect(res.body.payload.user.createdAt).to.be.a('string')
    })

    it('Check acl', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'elmiller@gmail.com', password: 'qwerty123' })

      expect(res.body.payload.acl).to.be.an('array')
    })
  })

  describe('Authentication with not valid credentials', () => {
    it('Check the status code', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'Eelmiller@gmail.com', password: 'qwerty123' })

      expect(res.statusCode).to.eq(400)
    })
  })
})
