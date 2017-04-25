<template>
  <div>
    <md-layout md-gutter="16">
      <md-layout v-for="day in days">
        <md-layout md-column>
          <md-layout md-align="center">
            <md-layout md-flex="50">
              <b class="day">{{ day.name }}</b>
            </md-layout>
          </md-layout>
        </md-layout>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
  const now = new Date
  function makeTime(hour, minute) {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute)
  }
  export default {
    name: 'calendar-view',
    data() {
      return {
        days: [
          {
            name: 'Monday',
            periods: new Map()
              .set('1', [makeTime(8, 30), makeTime(9, 10)])
              .set('2', [makeTime(9, 15), makeTime(9, 55)])
              .set('3', [makeTime(10, 25), makeTime(11, 5)])
              .set('4', [makeTime(11, 10), makeTime(11, 50)])
              .set('5', [makeTime(11, 55), makeTime(12, 35)])
              .set('6', [makeTime(1, 20), makeTime(2, 0)])
              .set('7', [makeTime(2, 5), makeTime(2, 45)])
          },
          {
            name: 'Tuesday',
            periods: new Map()
              .set('1', [makeTime(8, 30), makeTime(9, 10)])
              .set('2', [makeTime(9, 15), makeTime(9, 55)])
              .set('3', [makeTime(10, 35), makeTime(11, 30)])
              .set('4', [makeTime(11, 35), makeTime(12, 15)])
              .set('5', [makeTime(12, 20), makeTime(1, 0)])
              .set('6', [makeTime(1, 45), makeTime(2, 25)])
              .set('7', [makeTime(2, 30), makeTime(3, 10)])
          },
          {
            name: 'Wednesday',
            periods: new Map()
              .set('1', [makeTime(8, 30), makeTime(9, 10)])
              .set('2', [makeTime(9, 15), makeTime(9, 55)])
              .set('3', [makeTime(10, 25), makeTime(11, 5)])
              .set('4', [makeTime(11, 10), makeTime(11, 50)])
              .set('5', [makeTime(11, 55), makeTime(12, 35)])
              .set('6', [makeTime(1, 20), makeTime(2, 0)])
              .set('7', [makeTime(2, 5), makeTime(2, 45)])
          },
          {
            name: 'Thursday',
            periods: new Map()
              .set('1', [makeTime(8, 30), makeTime(9, 10)])
              .set('2', [makeTime(9, 15), makeTime(9, 55)])
              .set('3', [makeTime(10, 25), makeTime(11, 15)])
              .set('4', [makeTime(11, 20), makeTime(12, 0)])
              .set('5', [makeTime(1, 55), makeTime(2, 35)])
              .set('6', [makeTime(2, 40), makeTime(3, 20)])
              .set('7', [makeTime(3, 25), makeTime(4, 5)])
          },
          {
            name: 'Friday',
            periods: new Map()
              .set('1', [makeTime(8, 30), makeTime(9, 10)])
              .set('2', [makeTime(9, 15), makeTime(9, 55)])
              .set('3', [makeTime(10, 25), makeTime(11, 5)])
              .set('4', [makeTime(11, 10), makeTime(11, 50)])
              .set('5', [makeTime(11, 55), makeTime(12, 35)])
              .set('6', [makeTime(1, 20), makeTime(2, 0)])
              .set('7', [makeTime(2, 5), makeTime(2, 45)])
          }
        ]
      }
    }
  }
</script>

<style lang="sass" scoped>
  b.day
    font-size: 24px
</style>