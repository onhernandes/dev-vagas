const config = require('config')
const token = config.get('telegram.token')
const chatId = config.get('telegram.chatId')
const Telegram = require('telegraf/telegram')
const client = new Telegram(token)

module.exports = (text, url) => {
  let message = `${text}\n${url}`

  if (message.length > 4000) {
    const ending = '...\n'
    const cutLength = url.length + ending.length
    const textSubstr = text.substr(0, cutLength)
    message = textSubstr + ending + url
  }

  return client.sendMessage(chatId, message)
}
