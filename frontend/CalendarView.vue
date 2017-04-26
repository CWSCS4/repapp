<template>
  <div>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head v-for="(day, dayIndex) in days" class="center">
            {{ day.name }} ({{ mondayDate.getDate() }})
          </md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="index in maxPeriods()">
          <md-table-cell v-for="day in days">
            <md-card md-with-hover>
              <md-card-header>
                <div class="md-title">{{ day.periods[index - 1].period }}</div>
                <div class="md-subhead">
                  {{ day.periods[index - 1].time[0].toHHMM() }}
                  -
                  {{ day.periods[index - 1].time[1].toHHMM() }}
                </div>
              </md-card-header>
            </md-card>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </div>
</template>

<script>
  const now = new Date
  function makeTime(hour, minute) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute)
    date.toHHMM = function() {
      return (
        String((this.getHours() + 11) % 12 + 1) +
        ':' +
        (this.getMinutes() < 10 ? '0' : '') +
        String(this.getMinutes())
      )
    }
    return date
  }
  export default {
    name: 'calendar-view',
    data() {
      return {
        days: [
          {
            name: 'Monday',
            periods: [
              {period: '1', time: [makeTime(8, 30), makeTime(9, 10)]},
              {period: '2', time: [makeTime(9, 15), makeTime(9, 55)]},
              {period: '3', time: [makeTime(10, 25), makeTime(11, 5)]},
              {period: '4', time: [makeTime(11, 10), makeTime(11, 50)]},
              {period: '5', time: [makeTime(11, 55), makeTime(12, 35)]},
              {period: '6', time: [makeTime(1, 20), makeTime(2, 0)]},
              {period: '7', time: [makeTime(2, 5), makeTime(2, 45)]}
            ]
          },
          {
            name: 'Tuesday',
            periods: [
              {period: '1', time: [makeTime(8, 30), makeTime(9, 10)]},
              {period: '2', time: [makeTime(9, 15), makeTime(9, 55)]},
              {period: '3', time: [makeTime(10, 35), makeTime(11, 30)]},
              {period: '4', time: [makeTime(11, 35), makeTime(12, 15)]},
              {period: '5', time: [makeTime(12, 20), makeTime(1, 0)]},
              {period: '6', time: [makeTime(1, 45), makeTime(2, 25)]},
              {period: '7', time: [makeTime(2, 30), makeTime(3, 10)]}
            ]
          },
          {
            name: 'Wednesday',
            periods: [
              {period: '1', time: [makeTime(8, 30), makeTime(9, 10)]},
              {period: '2', time: [makeTime(9, 15), makeTime(9, 55)]},
              {period: '3', time: [makeTime(10, 25), makeTime(11, 5)]},
              {period: '4', time: [makeTime(11, 10), makeTime(11, 50)]},
              {period: '5', time: [makeTime(11, 55), makeTime(12, 35)]},
              {period: '6', time: [makeTime(1, 20), makeTime(2, 0)]},
              {period: '7', time: [makeTime(2, 5), makeTime(2, 45)]}
            ]
          },
          {
            name: 'Thursday',
            periods: [
              {period: '1', time: [makeTime(8, 30), makeTime(9, 10)]},
              {period: '2', time: [makeTime(9, 15), makeTime(9, 55)]},
              {period: '3', time: [makeTime(10, 25), makeTime(11, 15)]},
              {period: '4', time: [makeTime(11, 20), makeTime(12, 0)]},
              {period: '5', time: [makeTime(1, 55), makeTime(2, 35)]},
              {period: '6', time: [makeTime(2, 40), makeTime(3, 20)]},
              {period: '7', time: [makeTime(3, 25), makeTime(4, 5)]}
            ]
          },
          {
            name: 'Friday',
            periods: [
              {period: '1', time: [makeTime(8, 30), makeTime(9, 10)]},
              {period: '2', time: [makeTime(9, 15), makeTime(9, 55)]},
              {period: '3', time: [makeTime(10, 25), makeTime(11, 5)]},
              {period: '4', time: [makeTime(11, 10), makeTime(11, 50)]},
              {period: '5', time: [makeTime(11, 55), makeTime(12, 35)]},
              {period: '6', time: [makeTime(1, 20), makeTime(2, 0)]},
              {period: '7', time: [makeTime(2, 5), makeTime(2, 45)]}
            ]
          }
        ],
        mondayDate: new Date(now.getTime() - (now.getDay() - 1) * 86400000)
      }
    },
    methods: {
      maxPeriods() {
        let max
        for (const day of this.days) {
          const dayPeriods = day.periods.length
          if (max === undefined || dayPeriods > max) max = dayPeriods
        }
        return max
      }
    }
  }
</script>

<style lang="sass" scoped>
  .center
    text-align: center
</style>
