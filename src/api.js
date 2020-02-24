const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const sequelize = require('./db')
const Job = sequelize.model('Job')
const config = require('config')
const allowedRepos = config.get('github.allowedRepos')
const auth = require('basic-auth')

app.use(bodyParser())

app.use(async ctx => {
  ctx.body = {}
  const { name, pass } = auth.parse(ctx.request.headers.authorization)

  if (name !== config.get('auth.name') || pass !== config.get('auth.pass')) {
    return
  }

  const { action, issue, repository } = ctx.request.body

  if (action !== 'created' || !issue || allowedRepos.indexOf(repository.full_name)) {
    return
  }

  const job = await Job.create({
    issueNumber: issue.number,
    title: issue.title,
    url: issue.html_url
  })

  ctx.body = job.get({ plain: true })
})

app.listen(8080)
console.log('API running!')
