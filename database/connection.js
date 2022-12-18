const database = require('../config/database.json')

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : database.username,
      password : database.password,
      database : 'api_users'
    }
  });

module.exports = knex