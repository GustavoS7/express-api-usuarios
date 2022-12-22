const knex = require('../database/connection')
const bcrypt = require('bcrypt')

class User{

  async findAllUsers(){
    try{
      const users = await knex('users').select(["id", 'user_email', 'user_role', 'user_name'])
      console.log(users)
      return users
    }catch(err){
      console.log(e)
      return []
    }
  }

  async findUserById(id){
    try{
      const result = await knex('users').select(['id', 'user_email', 'user_name', 'user_role']).where({id: id})

      if(result.length > 0)
        return result[0]
      return undefined
    }catch(err){

    }
  }

  async create(user){
    const res = await this.checkEmail(user.email)
    const hash = await bcrypt.hash(user.password, 10)
    if(res){
      return res
    }else{
      try{
        await knex('users').insert({
          user_email: user.email,
          user_password: hash,
          user_name: user.name,
          user_role: user.role
        })
      }catch(err){
        console.log(err)
        return err
      }
    }
  }

  async checkEmail(email){
    try{
      const res = await knex('users').select().where({user_email: email})
      if(res.length > 0) 
        return {erro: 'Email já existe'}
      return false
    }catch(err){
      return {erro: 'Erro no cadastro, tente novamente mais tarde'}
      console.log(err)
    }
  }

  async Update(user){
    const result = await this.findById(user.id)

    if(result){
      const editUser = {}
      if(user.email){
        if(user.email != result.email){
          const checkEmail = await this.checkEmail(user.email)
          if(!checkEmail){
            editUser.email = email
          }
        }
      }
      if(user.name){
        if(user.email != result.email){
          const checkEmail = await this.checkEmail(user.email)
          if(!checkEmail){
            editUser.email = email
          }
        }
      }
    }else{
      return {status: false, err: 'O usúario não existe'}
    }
  }
}

module.exports = new User()