const Sequelize = require('sequelize')

const definition = {
  issueNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tweetId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tweetedAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  telegramMessageId: {
    type: Sequelize.STRING,
    allowNull: true
  }
}

module.exports = sequelize => sequelize.define('Job', definition, {})
