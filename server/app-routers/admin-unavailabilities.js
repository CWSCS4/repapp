const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/:day', function (req, res){
  res.json({
    success:true,
    days:db.unavailable-days.findAll({
    where:
      {day:
        {$gt: new Date(req.body.day),
        $lt:  new Date((new Date(req.body.day)).getTime() + 7 * 24 * 60 * 60 * 1000)},
      tierPriority:
        {$gte: req.link.tierPriority}
      },
    order: '"day" ASC',
  	attributes: ['day','reason']
  }),
  periods:db.unavailable-periods.findAll({
    where:
      {$or:[
        {day:
        {$gt: new Date(),
        $lt:  new Date((new Date()).getTime() + 7 * 24 * 60 * 60 * 1000)}},
        {repeatWeekly: true}],
      tierPriority:
        {$gte: req.link.tierPriority}
      },
      order: '"day" ASC',
      include:{model: db.period, attributes: ['day','period','start','end']},
    	attributes: ['day','reason','periodId','reapeatWeekly']
    })
}).catch(function (err){
      res.json({success: false, message: err.message})
  })
})

module.exports = router
