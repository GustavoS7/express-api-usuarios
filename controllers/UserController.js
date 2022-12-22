const knex = require("knex")
const Validacao = require('../services/Validacao')
const User = require("../models/User")

class UserController{

  async index(req, res){
    const users = await User.findAllUsers()
    return res.status(200).send({users: users})
  }

  async findUserById(req, res){
    const { id } = req.params
    const user = await User.findById(id)
    if(user){
      res.status(200).json(user)
    }else{
      res.status(404).json({err: 'Usuário não existe'})
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
}

module.exports = new UserController()