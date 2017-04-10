module.exports = (sequelize, Sequelize) =>
  sequelize.define('period', {
    day: {
      type: Sequelize.ENUM(
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ),
      allowNull: false
    },
    period: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    time: {
      type: Sequelize.RANGE(Sequelize.TIME),
      allowNull: false
    }
  })