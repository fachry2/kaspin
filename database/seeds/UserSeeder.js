'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await User.createMany([
      {
        username: 'admin',
        role: 'admin',
        email: 'admin@kaspin.com',
        password: 'admin123',
      },
      {
        username: 'user1',
        email: 'user@kaspin.com',
        password: '123456'
      }
    ])
  }
}

module.exports = UserSeeder
