const Knex = require("knex")
const Email = require('../services/Email')

class UserController{

  async indexedDB(req, res){}

  async create (req, res){
    const { nome, password, email } = req.body

    if(!password)
      return res.status(400).send({erro: 'Insira uma Senha!'})
    if(!email) 
      return res.status(400).send({erro: 'Insira um Email!'})
    if(!nome) 
      return res.status(400).send({erro: 'Insira um Email!'})

    const validacaoEmail = Email.ValidarEmail(email)

    console.log(validacaoEmail)

    if(!validacaoEmail)
      return res.status(400).send({erro: 'Email Inválido'})
    
    try {
      // const exist = await Knex('users').select().where({email})
      // if(exist)
      //   return res.status(400).send({erro: 'Email ja cadastrado'})

      // await Knex('users').insert({
      //   email,
      //   password
      // })
      return res.status(200).send({message: 'Usuário cadastrado com sucesso'})
    }catch(err){
      res.status(400).send(err)
    }
  }
}

module.exports = new UserController()