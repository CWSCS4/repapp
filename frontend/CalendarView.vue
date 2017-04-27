<template>
  <div>
    <md-toolbar class="md-dense">
      <md-button class="md-icon-button" @click.native="lastWeek">
        <md-icon>chevron_left</md-icon>
      </md-button>
      <md-button @click.native="today">
        Today
      </md-button>
      <md-button class="md-icon-button" @click.native="nextWeek">
        <md-icon>chevron_right</md-icon>
      </md-button>
      <md-spinner md-indeterminate md-size="40" class="md-accent" v-if="loading"></md-spinner>
    </md-toolbar>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head v-for="(day, dayIndex) in days" class="center">
            {{ day.name }}
            ({{ mondayDate.addDays(dayIndex).toShortDate() }})
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
                  <div class="unavailable" v-if="unavailabilities.periods.has(day.periods[index - 1])">
                    Unavailable
                    <md-tooltip md-direction="top">
                      {{ unavailabilities.periods.get(day.periods[index - 1]).reason }}
                    </md-tooltip>
                  </span>
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
  Date.prototype.addDays = function(days) {
    return new Date(this.getTime() + 86400000 * days)
  }
  Date.prototype.toHHMM = function() {
    return (
      String((this.getHours() + 11) % 12 + 1) +
      ':' +
      (this.getMinutes() < 10 ? '0' : '') +
      String(this.getMinutes())
    )
  }
  Date.prototype.toShortDate = function() {
    return String(this.getMonth() + 1) + '/' + String(this.getDate())
  }
  const now = new Date
  const makeTime = (hour, minute) =>
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute)
  const lastMonday = now.addDays(1 - now.getDay())
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
        mondayDate: lastMonday,
        unavailabilities: {
          days: new Map,
          periods: new Map
        },
        loading: false
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
      },
      lastWeek() {
        this.mondayDate = this.mondayDate.addDays(-7)
      },
      today() {
        this.mondayDate = lastMonday
      },
      nextWeek() {
        this.mondayDate = this.mondayDate.addDays(7)
      },
      getUnavailabilities() {
        this.loading = true
        setTimeout(() => { //this will eventually actually send a request to the server
          this.loading = false
          this.unavailabilities.periods = new Map()
            .set(this.days[1].periods[Math.floor(Math.random() * 7)], {reason: 'Special assembly', tierPriority: 2})
            .set(this.days[4].periods[Math.floor(Math.random() * 7)], {reason: 'Calc 2', tierPriority: 0})
        }, 500)
      }
    },
    mounted() {
      this.getUnavailabilities()
    },
    watch: {
      mondayDate() {
        this.getUnavailabilities()
      }
    }
  }
</script>

<style lang="sass" scoped>
  .center
    text-align: center

  div.unavailable
    background: red
</style>
