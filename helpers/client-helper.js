import request from 'supertest'

const chance = require('chance').Chance()

function createClient(
  name = chance.name(),
  phone = chance.phone(),
  email = 'user_' + Date.now() + '@gmail.com',
  description = chance.word()
) {
  return request(process.env.BASE_URL)
    .post('/v5/client')
    .send({ name, phone, email, description })
    .set('Authorization', process.env.TOKEN)
}

function updateClient(
  clientId,
  phone = Date.now(),
  email = 'user_' + Date.now() + '@gmail.com'
) {
  return request(process.env.BASE_URL)
    .patch('/v5/client/' + clientId)
    .send({ phone, email })
    .set('Authorization', process.env.TOKEN)
}

function getClientById(clientId) {
  return request(process.env.BASE_URL)
    .get('/v5/client/' + clientId)
    .set('Authorization', process.env.TOKEN)
}

function getClientByName(clientName) {
  return request(process.env.BASE_URL)
    .post('/v5/client/search')
    .send({ name: clientName })
    .set('Authorization', process.env.TOKEN)
}

function getAllClients() {
  return request(process.env.BASE_URL)
    .post('/v5/client/search')
    .set('Authorization', process.env.TOKEN)
}

function deleteClient(clientId) {
  return request(process.env.BASE_URL)
    .delete('/v5/client/' + clientId)
    .set('Authorization', process.env.TOKEN)
}

export {
  createClient,
  updateClient,
  getClientById,
  getClientByName,
  getAllClients,
  deleteClient,
}
