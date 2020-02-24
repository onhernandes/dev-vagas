const db = require('./index')

db
  .sync()
  .then(() => console.log('Database syncronized successfully!'))
  .then(() => db.close())
