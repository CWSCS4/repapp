const express = require('express')
const app = express()
const db = require('./database.js')
const bodyParser = require('body-parser')

// This address is relative to where the node process is started.
app.use(express.static('public'))

app.use(bodyParser.json())

app.get('/api/links', function (req, res) {
  db.link.findAll().then(links => {
      res.json(links)
  })
})

app.get('/api/link/:linkid', function (req, res) {
  db.link.findOne({where: {uuid:req.params.linkid} }).then(link => {
      res.json(link)
  })
})

app.post('/api/link', function (req, res) {
  database.link.create({college:req.body.collegeName, repName:req.body.repName, tierPriority:req.body.tier, notesToCollege:req.body.repName.toCollege}).then(linkObject => {
    res.json({uuid:linkObject.uuid})
  })
})

module.exports = app
