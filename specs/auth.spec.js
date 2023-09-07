import { expect } from 'chai'
import request from 'supertest'
import 'dotenv/config'

describe('Authentication', function () {
  describe('Authentication with valid credentials', function () {
    it('Validate status code', async function () {
      let res
      res = await request(process.env.BASE_URL)
        .post('/user/login')
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD })

      //console.log(res)

      expect(res.statusCode).to.eq(200)
    })

    it('Validate response message', async function () {
      let res
      res = await request(process.env.BASE_URL)
        .post('/user/login')
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD })

      //console.log(res)

      expect(res.body.message).to.eq('Auth success')
    })

    it('Check the token exist', async function () {
      let res
      res = await request(process.env.BASE_URL)
        .post('/user/login')
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD })

      //console.log(res)

      expect(res.body.payload.token).to.be.a('string')
    })

    it('Check the role', async () => {
      let res
      res = await request(process.env.BASE_URL)
        .post('/user/login')
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD })

      expect(res.body.payload.user.roles).to.be.an('array')
    })

    it('Check the creation time', async () => {
      let res
      res = await request(process.env.BASE_URL)
        .post('/user/login')
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD })

      expect(res.body.payload.user.createdAt).to.be.a('string')
    })

    it('Check acl', async () => {
      let res
      res = await request(process.env.BASE_URL)
        .post('/user/login')
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD })

      expect(res.body.payload.acl).to.be.an('array')
    })
  })

  describe('Authentication with not valid credentials', () => {
    it('Check the status code', async () => {
      let res
      res = await request(process.env.BASE_URL)
        .post('/user/login')
        .send({ email: 'elkmfkdms@gmail.com', password: process.env.PASSWORD })

      expect(res.statusCode).to.eq(400)
    })
  })
})
