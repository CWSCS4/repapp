<template>
  <div>
    <md-layout md-gutter="24">
      <md-layout v-for="day in days">
        <md-layout md-column md-gutter="8">
          <md-layout>
            <b class="day">{{ day.name }}</b>
          </md-layout>
          <md-layout v-for="period in day.periods">
            <md-whiteframe md-elevation="5" class="period">
              <md-layout md-column>
                <md-layout>
                  <div class="period-times">
                    {{ period.time[0].toHHMM() }}
                    -
                    {{ period.time[1].toHHMM() }}
                  </div>
                </md-layout>
                <md-layout>
                  <div class="name">
                    {{ period.period }}
                  </div>
                </md-layout>
              </md-layout>
            </md-whiteframe>
          </md-layout>
        </md-layout>
      </md-layout>
    </md-layout>
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
        ]
      }
    }
  }
</script>

<style lang="sass" scoped>
  b.day
    font-size: 24px

  .period
    width: 100%

  b.day, div.name, div.period-times
    margin: auto
</style>
