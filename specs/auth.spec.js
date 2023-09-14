import { expect } from 'chai'
import request from 'supertest'
import 'dotenv/config'
import { login } from '../helpers/general-helper'

describe('Authentication', function () {
  describe('Authentication with valid credentials', function () {
    let res
    before(async () => {
      res = await login(process.env.EMAIL, process.env.PASSWORD)
    })

    it('Validate status code', async function () {
      expect(res.statusCode).to.eq(200)
    })

    it('Validate response message', function () {
      expect(res.body.message).to.eq('Auth success')
    })

    it('Check the token exist', function () {
      expect(res.body.payload.token).to.be.a('string')
    })
  })

  // describe('Auth with invalid credentials', () => {
  //   let res
  //   before(async () => {
  //     res = await login('invalid', 'invalid')
  //   })
  //
  //   it('validate r', () => {
  //
  //   });
  // })
})

//
//     it('Check the role', async () => {
//       let res
//       res = await request(process.env.BASE_URL)
//         .post('/user/login')
//         .send({ email: process.env.EMAIL, password: process.env.PASSWORD })
//
//       expect(res.body.payload.user.roles).to.be.an('array')
//     })
//
//     it('Check the creation time', async () => {
//       let res
//       res = await request(process.env.BASE_URL)
//         .post('/user/login')
//         .send({ email: process.env.EMAIL, password: process.env.PASSWORD })
//
//       expect(res.body.payload.user.createdAt).to.be.a('string')
//     })
//
//     it('Check acl', async () => {
//       let res
//       res = await request(process.env.BASE_URL)
//         .post('/user/login')
//         .send({ email: process.env.EMAIL, password: process.env.PASSWORD })
//
//       expect(res.body.payload.acl).to.be.an('array')
//     })
//   })
//
//   describe('Authentication with not valid credentials', () => {
//     it('Check the status code', async () => {
//       let res
//       res = await request(process.env.BASE_URL)
//         .post('/user/login')
//         .send({ email: 'elkmfkdms@gmail.com', password: process.env.PASSWORD })
//
//       expect(res.statusCode).to.eq(400)
//     })
//   })
// })
