const Job = require('./Job')
const config = require('config')
const Sequelize = require('sequelize')

const db = config.get('pgsql.database')
const username = config.get('pgsql.username')
const password = config.get('pgsql.password')
const host = config.get('pgsql.host')
const sequelize = new Sequelize(db, username, password, {
  dialect: 'postgres',
  host
})

Job(sequelize)

module.exports = sequelize
