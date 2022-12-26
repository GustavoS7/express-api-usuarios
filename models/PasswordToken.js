const knex = require('../database/connection')
const User = require('./User')

class PasswordToken{
  
  async create(email){
    const user = await User.findUserByEmail(email)

    if(user){
      try{
        const token = Date.now()
        await knex('passwordtokens').insert({
          user_id: user.id,
          used: 0,
          token: token
        })

        return {status: true, token: token}
      }catch(err){
        return err.message
      }
    }else{
      return {status: false, err: 'Usuário não existe'}
    }
  }

  async validate(token){
    try{
      const result = await knex('passwordtokens').select().where({token: token})
      if(result.length > 0){
        const tk = result[0]

        if(tk.used){
          return false
        }else{
          return true
        }
      }

    }catch(err){
      return false
    }
  }
}

module.exports = new PasswordToken()