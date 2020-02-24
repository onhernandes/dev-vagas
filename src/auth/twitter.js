const open = require('open')
const config = require('config')
const Twitter = require('twitter-lite')
const clientConfig = {
  consumer_key: config.get('twitter.consumerKey'),
  consumer_secret: config.get('twitter.consumerSecret')
}
const client = new Twitter(clientConfig)
const readline = require('readline')

const exec = async () => {
  const {
    oauth_token: requestToken,
    oauth_token_secret: requestTokenSecret
  } = await client.getRequestToken(config.get('twitter.callback'))

  await open(`https://api.twitter.com/oauth/authenticate?oauth_token=${requestToken}`, { wait: true, app: 'google-chrome-stable' })
  const readlineInterface = readline.createInterface(process.stdin, process.stdout)

  readlineInterface.setPrompt('Insert the OAuth Verifier here: ')
  readlineInterface.prompt()
  readlineInterface
    .on('line', async line => {
      const {
        oauth_token: accessToken,
        oauth_token_secret: accessTokenSecret
      } = await client.getAccessToken({ key: requestToken, secret: requestTokenSecret, verifier: line })

      console.log({ accessToken, accessTokenSecret })
      readlineInterface.close()
    })
}

exec()
