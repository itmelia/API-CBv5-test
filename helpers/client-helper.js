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

// function updateClient(email = chance.phone()) {
//   return request(process.env.BASE_URL)
//     .patch('/v5' + process.env.ID)
//     .send({ email })
//     .set('Authorization', process.env.TOKEN)
// }
export { createClient }
