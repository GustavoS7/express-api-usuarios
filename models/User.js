const knex = require('../database/connection')
const bcrypt = require('bcrypt')
const PasswordToken = require('./PasswordToken')

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
      return {status: false, err: err.message}
    }
  }

  async findUserByEmail(email){
    try{
      const result = await knex('users').select(['id', 'user_email', 'user_password', 'user_name', 'user_role']).where({email: email})

      if(result.length > 0)
        return result[0]
      return undefined
    }catch(err){
      return {status: false, err: err.message}
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
            editUser.email = user.email
          }else{
            return {status: false, err: 'E-mail já cadastrado'}
          }
        }
      }
      if(user.name){
        editUser.email = user.name
      }
      if(user.role){
        editUser.role = user.role
      }

      try{
        await knex('users').update(editUser).where({id: id})
        return {status: true}
      }catch(err){
        return {status: false, err: err.message}
      }

    }else{
      return {status: false, err: 'O usúario não existe'}
    }
  }

  async delete(id){
    const user = await this.findUserById(id)
    if(user){
      try{
        await knex('users').delete().where({id: id})
        return {status: true}
      }catch(err){
        return {status: false, err: err.message}
      }
    }else{
      return {status: false, err: 'O usuário não exite'}
    }
  }

  async cahngePassword(newPassword, id, token){
    const hash = await bcrypt.hash(newPassword, 10)
    await knex('users').update({user_password: hash}).where({id: id})
    await PasswordToken.setUsed(token)
  }
}

module.exports = new User()