const Twitter = require('twitter-lite')
const config = require('config')
const client = new Twitter({
  consumer_key: config.get('twitter.consumerKey'),
  consumer_secret: config.get('twitter.consumerSecret'),
  access_token_key: config.get('twitter.accessToken'),
  access_token_secret: config.get('twitter.accessTokenSecret')
})

module.exports = (text, url) => {
  let status = `${text} ${url}`

  if (status.length > 280) {
    const ending = '... '
    const cutLength = url.length + ending.length
    const textSubstr = text.substr(0, cutLength)
    status = textSubstr + ending + url
  }

  return client.post('statuses/update', { status })
}
