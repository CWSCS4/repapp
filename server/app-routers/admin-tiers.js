const express = require('express')
const {tier: Tier} = require('../database')
const respondWithError = require('../respond-with-error')
const router = express.Router()

for (const tierType of ['college', 'unavailability']) {
  const columnName = tierType + 'Description'
  router.get('/' + tierType, (req, res) => {
    Tier.findAll({
      attributes: [
        'priority',
        columnName
      ],
      where: {
        [columnName]: {$ne: null}
      }
    })
      .then(tiers => res.json({success: true, tiers}))
      .catch(respondWithError(res))
  })
}
router.get('/all', (req, res) => {
  Tier.findAll({
    attributes: [
      'priority',
      'collegeDescription',
      'unavailabilityDescription'
    ]
  })
    .then(tiers => res.json({success: true, tiers}))
    .catch(respondWithError(res))
})

router.post('/', (req, res) => {
  Tier.create({
    priority: req.body.priority,
    collegeDescription: req.body.collegeDescription,
    unavailabilityDescription: req.body.unavailabilityDescription
  })
    .then(() => res.json({success: true}))
    .catch(respondWithError(res))
})

router.delete('/:priority', function (req, res) {
  Tier.destroy({
    where: {priority: req.params.priority}
  })
    .then(() => res.json({success: true}))
    .catch(respondWithError(res))
})

module.exports = router
