module.exports = (sequelize, Sequelize) => {
  const preferenceType = {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }

  return sequelize.define('user', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    passwordHash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    emailOnPeriodChoice: preferenceType,
    emailOnCancellation: preferenceType,
    emailOnNoteChange: preferenceType,
    emailDailyDigest: preferenceType
  })
}