'use strict'

const { test, trait } = use('Test/Suite')('Kaspin')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

test('check login', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({ email: 'user@gmail.com'})
  const response = await client.post('/api/kaspin/v1/login')
    .send({ email: user.email, password: 'test123' })
    .end()
  assert.equal(response.body.email, 'user@gmail.com')
  assert.isNotNull(response.body.token)
  response.assertStatus(200)
}).timeout(0)

test('access api/kaspin/v1/alamat/:id as admin', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({role: 'admin'})

  const response = await client.get('api/kaspin/v1/alamat/11')
    .loginVia(user, 'jwt')
    .send({ email: user.email, password: 'test123' })
    .end()

  response.assertJSON({
    status: 'data',
    data: { key: 'provinsi', value: { id: '11', nama: 'ACEH' } }
  })
  response.assertStatus(200)
}).timeout(0)

test('access api/kaspin/v1/alamat/:id as user', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.get('api/kaspin/v1/alamat/11')
    .loginVia(user, 'jwt')
    .send({ email: user.email, password: 'test123' })
    .end()

  response.assertJSON({status:"Permission denied", data:[]})
  response.assertStatus(403)
}).timeout(0);

test('access /api/kaspin/v1/alamat/kecamatan/:kota_id as admin', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({role: 'admin'})

  const response = await client.get('api/kaspin/v1/alamat/kecamatan/1101')
    .loginVia(user, 'jwt')
    .send({ email: user.email, password: 'test123' })
    .end()

  assert.equal(response.body.data.key, 'kecamatan')
  assert.equal(response.body.data.value.length, 10)
  response.assertStatus(200)
}).timeout(0)

test('access /api/kaspin/v1/alamat/kecamatan/:kota_id as user', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.get('api/kaspin/v1/alamat/kecamatan/1101')
    .loginVia(user, 'jwt')
    .send({ email: user.email, password: 'test123' })
    .end()

  response.assertJSON({status:"Permission denied", data:[]})
  response.assertStatus(403)
}).timeout(0);
