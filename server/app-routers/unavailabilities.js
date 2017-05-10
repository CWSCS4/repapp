const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/:day', function (req, res){
  db.unavailable_day.findAll({
      where:
        {day:
          {$gte: new Date(req.params.day),
          $lt:  new Date((new Date(req.params.day)).getTime() + 7 * 24 * 60 * 60 * 1000)},
          tierPriority:{
            $lt:req.link.tierPriority
          }
        },
      order: '"day" ASC',
      attributes: ['day']
    }).then( function ( unavailable_days ) {
      return [unavailable_days, db.unavailable_period.findAll({
        where:
          {$or:[
            {day:
            {$gte: new Date(req.params.day),
            $lt:  new Date((new Date(req.params.day)).getTime() + 7 * 24 * 60 * 60 * 1000)}},
            {$and:
              {repeatWeekly: true,
                $or:[
                  {repeatEnd:
                    {
                      $gte:new Date(req.params.day)
                    }
                  },
                  {repeatEnd:null}
                ]
              }
            }
            ],
          tierPriority:{
            $lt:req.link.tierPriority
          }
        },
        order: '"day" ASC',
        include:{model: db.period, attributes: ['day','period','start','end']},
        attributes: ['day','periodId','repeatWeekly','repeatEnd']
      })]
    }
  ).spread( function ( unavailable_days, unavailable_periods) {
    res.json({success : true, days : unavailable_days, periods : unavailable_periods})
  })
  .catch(function (err){
      res.json({success: false, message: err.message})
  })
})

module.exports = router
