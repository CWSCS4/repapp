const express = require('express')
const {admin: Admin} = require('../database')
const respondWithError = require('../respond-with-error')
const validatePostParams = require('../validate-post-params')

const SETTINGS_COLUMNS = [
  'emailOnPeriodChoice',
  'emailOnCancellation',
  'emailOnNoteChange',
  'emailDailyDigest'
]
const SETTINGS_COLUMNS_SET = new Set(SETTINGS_COLUMNS)

const router = express.Router()
router.get('/all', (req, res) => {
  Admin.findOne({
    attributes: SETTINGS_COLUMNS,
    where: {
      email: req.session.admin.email
    }
  })
    .then(admin => {
      const settings = {}
      for (const setting of SETTINGS_COLUMNS) settings[setting] = admin[setting]
      res.json({success: true, settings})
    })
    .catch(respondWithError(res))
})
router.post('/set',
  validatePostParams({
    setting: String,
    on: Boolean
  }),
  (req, res) => {
    if (!SETTINGS_COLUMNS_SET.has(req.body.setting)) {
      res.json({success: false, message: 'Invalid setting: ' + req.body.setting})
      return
    }
    Admin.update(
      {[req.body.setting]: req.body.on},
      {
        where: {
          email: req.session.admin.email
        }
      }
    )
      .then(() => res.json({success: true}))
      .catch(respondWithError(res))
  }
)

module.exports = router