module.exports = (sequelize, Sequelize) => {
  const UnavailablePeriod = sequelize.define('unavailable_period', {
    reason: Sequelize.STRING,
    time: {
      type: Sequelize.RANGE(Sequelize.DATE),
      allowNull: false
    },
    repeatWeekly: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    repeatEnd: Sequelize.DATEONLY, //inclusive
  }, {
    classMethods: {
      associate({tier}) {
        UnavailablePeriod.belongsTo(tier)
      }
    }
  })
  return UnavailablePeriod
}