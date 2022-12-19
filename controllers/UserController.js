const knex = require("knex")
const Email = require('../services/Email')
const User = require("../models/User")

class UserController{

  async indexedDB(req, res){}

  async create (req, res){
    const { role, name, password, email } = req.body

    if(!password)
      return res.status(400).send({erro: 'Insira uma Senha!'})
    if(!email) 
      return res.status(400).send({erro: 'Insira um Email!'})
    if(!name) 
      return res.status(400).send({erro: 'Insira um Email!'})

    const validacaoEmail = Email.ValidarEmail(email)

    if(!validacaoEmail)
      return res.status(400).send({erro: 'Email Inválido'})
    
    try {
      const exist = await User.checkEmail(email)
      if(exist)
        return res.status(400).send({erro: 'Email ja cadastrado'})

    
      return res.status(200).send({message: 'Usuário cadastrado com sucesso'})
    }catch(err){
      res.status(400).send({err})
    }
  }
}

module.exports = new UserController()