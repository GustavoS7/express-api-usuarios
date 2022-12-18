class UserController{

  async indexedDB(req, res){}

  async create (req, res){
    res.send(req.body)
  }
}

module.exports = new UserController()