const sequelize = require('./db')
const Job = sequelize.model('Job')
const tweet = require('./publishers/twitter')
const telegram = require('./publishers/telegram')

const getJob = () => Job.findOne({
  where: {
    telegramMessageId: null,
    tweetedAt: null,
    tweetId: null
  },
  raw: true
})

const exec = async () => {
  const job = await getJob()

  if (!job) {
    console.log('No jobs to be published!')
  }

  const [tweetData, telegramData] = await Promise.all([
    tweet(job.title, job.url),
    telegram(job.title, job.url)
  ])

  await Job.update(
    {
      tweetId: tweetData.id_str,
      tweetedAt: new Date(tweetData.created_at),
      telegramMessageId: telegramData.message_id
    },
    {
      where: {
        id: job.id
      }
    }
  )
}

setInterval(exec, 40000)
