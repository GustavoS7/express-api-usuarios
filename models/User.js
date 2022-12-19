const knex = require('../database/connection')
const bcrypt = require('bcrypt')

class User{

  async create(user){
    await knex('users').insert({
      user_email: email,
      user_password: password,
      user_name: name,
      user_role: role
    })
  }

  async checkEmail(email){
    const exist = await knex('users').select().where({user_email: email})
    console.log(exist)
  }
}

module.exports = new User()