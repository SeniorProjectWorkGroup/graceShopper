'use strict'

const db = require('../server/db')

db
  .sync({force: true})
  .then(() => {
    console.log('Database has been cleared')
  })
  .finally(() => {
    db.close()
  })
