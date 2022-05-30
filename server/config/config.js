require('dotenv').config();

module.exports = {

  "development": {
    "username": "root",
    "password": "password",
    "database": "tfgdb",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "b976cfa96691f2",
    "password": "e1b56bb4",
    "database": "heroku_cf5c4e9e2e2106c",
    "host": "eu-cdbr-west-02.cleardb.net",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
