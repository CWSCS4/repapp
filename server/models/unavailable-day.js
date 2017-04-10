module.exports = (sequelize, Sequelize) => {
  const UnavailableDay = sequelize.define('unavailable_day', {
    reason: Sequelize.STRING,
    days: {
      type: Sequelize.RANGE(Sequelize.DATE),
      allowNull: false
    }
  }, {
    classMethods: {
      associate({tier}) {
        UnavailableDay.belongsTo(tier)
      }
    }
  })
  return UnavailableDay
}