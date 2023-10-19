import {
  createClient,
  updateClient,
  getClientById,
  getClientByName,
  getAllClients,
  deleteClient,
} from '../helpers/client-helper'
import { expect } from 'chai'

const chance = require('chance').Chance()

describe('Client tests', () => {
  describe('Create a client', () => {
    //const randomEmail = 'user_' + Date.now() + '@gmail.com'
    let res

    before(async () => {
      res = await createClient()
    })

    it('check the status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).include('created')
    })

    it('Check the client id', () => {
      expect(res.body.payload).to.be.a('string')
    })

    describe('update the client', () => {
      let clientId, res, clientsPhone, updatedClientPhone
      before(async () => {
        clientId = (await createClient()).body.payload
        clientsPhone = (await getClientById(clientId)).body.payload.phone

        res = await updateClient(clientId)
        updatedClientPhone = (await getClientById(clientId)).body.payload.phone
      })

      it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
      })

      it('check the response message', () => {
        expect(res.body.message).include('updated')
      })
    })

    describe('Get client by ID', () => {
      let clientId, res

      before(async () => {
        clientId = (await createClient()).body.payload
        res = await getClientById(clientId)
      })

      it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
      })

      it('check the response message', () => {
        expect(res.body.message).to.eq('Get Client by id ok')
      })

      it('check if the response is an object', () => {
        expect(res.body).to.be.a('object')
      })
    })

    describe('Get the client by name', () => {
      let clientId, clientName, res

      before(async () => {
        clientId = (await createClient()).body.payload
        clientName = (await getClientById()).body.payload.name

        res = await getClientByName(clientName)
      })

      it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
      })

      it('check the response body', () => {
        expect(res.body.message).include('ok')
      })
    })

    describe('Get all clients', () => {
      let res

      before(async () => {
        res = await getAllClients()
      })

      it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
      })

      it('check the response body', () => {
        expect(res.body.message).include('ok')
      })

      it('verify the type of items is array', () => {
        expect(res.body.payload.items).to.be.an('array')
      })
    })

    describe('Delete the client', () => {
      let clientId, res

      before(async () => {
        clientId = (await createClient()).body.payload

        res = await deleteClient(clientId)
      })

      it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
      })

      it('check the response body', () => {
        expect(res.body.message).include('deleted')
      })
    })
  })
})

// describe('Negative test-cases for client', () => {
//   before(async () => {
//     await login(process.env.EMAIL, process.env.PASSWORD)
//   })
//
//   it('Creating a client with empty required fields', async () => {
//     const res = await request(process.env.BASE_URL)
//       .post('/v5/client')
//       .send({ name: '', phone: '' })
//       .set('Authorization', process.env.TOKEN)
//
//     expect(res.statusCode).to.eq(400)
//     expect(res.body.message).to.eq('Client create error')
//   })
//
//   it('Create a client with all fields empty', async () => {
//     const res = await request(process.env.BASE_URL)
//       .post('/v5/client')
//       .send({ name: '', phone: '', email: '', description: '' })
//       .set('Authorization', process.env.TOKEN)
//
//     expect(res.statusCode).to.eq(400)
//     expect(res.body.message).to.eq('Client create error')
//   })
//
//   it('Create a client without authorization', async () => {
//     const res = await request(process.env.BASE_URL).post('/v5/client').send({
//       name: 'qwerty',
//       phone: '123456789',
//       email: 'qwerty@gmail.com',
//       description: 'qwerty qwerty',
//     })
//
//     expect(res.statusCode).to.eq(400)
//     expect(res.body.message).to.eq('Auth failed')
//   })
//
//   it('Update the client without authorization', async () => {
//     const res = await request(process.env.BASE_URL)
//       .patch('/v5/client/' + process.env.ID)
//       .send({
//         name: 'Eliee',
//       })
//
//     expect(res.statusCode).to.eq(400)
//     expect(res.body.message).to.eq('Auth failed')
//   })
//
//   it('Update the client without ID', async () => {
//     const res = await request(process.env.BASE_URL)
//       .patch('/v5/client')
//       .send({ name: 'Eliee' })
//       .set('Authorization', process.env.TOKEN)
//
//     expect(res.statusCode).to.eq(404)
//     expect(res.body.message).include('not found')
//   })
