const express = require('express')
const app = express()
const db = require('./models')

// This address is relative to where the node process is started.
app.use(express.static('public'))

app.get('/api/links', function (req, res) {
  db.link.findAll().then(links => {
      res.json(links)
  })
})

app.get('/api/link/:linkid', function (req, res) {
  db.link.findOne({where: {uuid:req.linkid} }).then(link => {
      res.json(link)
  })
})

module.exports = app