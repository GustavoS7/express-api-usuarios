const database = require('../config/database.json')

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : database.username,
      password : database.password,
      database : 'api_users'
    }
  });

module.exports = knex