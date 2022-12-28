const jwt = require('jsonwebtoken')
secret = require('../config/secret.json')

module.exports = function (req, res, next){

  const authToken = req.headers['authorization']

  if(authToken){
    const bearer = authToken.split(' ')
    const token = bearer[1]

    try{
      const decoded = jwt.verify(token, secret.secret)
      if(decoded.role === 1){
        next()
      }else{
      return res.status(403).send({err: 'Você não tem autorização'})
      }
    }catch(err){
      return res.status(403).send({err: err.message})
    }
  }else{
    return res.status(403).send({err: 'Você não esta autorizado'})
  }

}