const Validacao = require('../services/Validacao')
const User = require("../models/User")
const UserController = require('../models/PasswordToken')
const PasswordToken = require('../models/PasswordToken')

class UserController{

  async index(req, res){
    const users = await User.findAllUsers()
    return res.status(200).send({users: users})
  }

  async findUserById(req, res){
    const { id } = req.params
    const user = await User.findById(id)
    if(user){
      return res.status(200).json(user)
    }else{
      return res.status(404).json({err: 'Usuário não existe'})
    }
  }

  async create (req, res){
    const { role, name, password, email } = req.body
    const user = {
      name,
      email,
      password, 
      role
    }
    
    const validacao = Validacao.ValidacaoGeral(user)

    if(validacao){
      try {
        const response = await User.create(user)
        if(response)
          return res.status(400).send(response)
        return res.status(200).send({message: 'Usuário cadastrado com sucesso'})
      }catch(err){
        console.log(err)
        return res.status(400).send({err: 'Erro no cadastro, tente novamente mais tarde'})
      }
    }
  }

  async edit(req, res){
    const {id, name, role, email} = req.body
    const user = {
      id,
      email,
      name,
      role
    }
    const result = await User.update(user)
    if(result.status !== undefined){
      if(result.status){
        return res.status(200).send({status: 'Ok'})
      }else{
        return res.status(400).json(result.err)
      }
    }else{
      return res.status(406).send('Ocorreu um erro no servidor')
    }
  }

  async remove(req, res){
    const {id} = req.params

    const result = await User.delete(id)

    if(result.status){
      return res.status(200).send('Ok')
    }else{
      return res.status(400).send(result.err)
    }
  }

  async recoverPassword(req, res){
    const {email} = req.body

    const result = await PasswordToken.create(email)

    if(result.status){
      return res.status(200).send('' + result.token)
    }else{
      return res.status(406).send(result.err)
    }
  }

  async changePassword(req, res){
    const {token, password} = req.body

    const isToken = await PasswordToken.validate(token)

    if(isToken){
      
    }else{
      res.status(406).send('Token Inválido')
    }
  }
}

module.exports = new UserController()