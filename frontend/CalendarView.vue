<template>
  <div>
    <md-toolbar class="md-dense" id="week-toolbar">
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
          <md-table-head class="center" v-for="(day, dayIndex) in days"
            :class="{unavailable: isUnavailableDay(day)}"
            @click.native="openUnavailableForm({day})"
          >
            {{ day.name }}
            ({{ mondayDate.addDays(dayIndex).toShortDate() }})
            <md-tooltip md-direction="bottom" v-if="admin && isUnavailableDay(day)">
              {{ getUnavailableText({day}) }}
            </md-tooltip>
          </md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="period in periods">
          <md-table-cell class="less-padding" v-for="dayPeriod in period">
            <md-card md-with-hover class="full-width" v-if="dayPeriod"
              :class="{
                unavailable: isUnavailablePeriod(dayPeriod),
                visiting: visits.has(dayPeriod.time)
              }"
              @click.native="openUnavailableForm({period: dayPeriod})"
            >
              <md-card-header>
                <div class="md-title">{{ dayPeriod.period }}</div>
                <div class="md-subhead">
                  {{ dayPeriod.time[0].toHHMM() }}
                  -
                  {{ dayPeriod.time[1].toHHMM() }}
                </div>
              </md-card-header>
              <md-tooltip md-direction="top" v-if="admin && isUnavailablePeriod(dayPeriod)">
                {{ getUnavailableText({period: dayPeriod}) }}
              </md-tooltip>
              <md-tooltip md-direction="top" v-if="admin && visits.has(dayPeriod.time)">
                College:
                {{ visits.get(dayPeriod.time) }}
              </md-tooltip>
            </md-card>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <md-dialog ref="unavailableForm">
      <md-dialog-title>Edit unavailability</md-dialog-title>
      <md-dialog-content>
        <md-checkbox v-model="unavailableForm.unavailable">Unavailable</md-checkbox>
        <md-input-container>
          <label>Reason</label>
          <md-input v-model="unavailableForm.reason" :disabled="!unavailableForm.unavailable"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Tier</label>
          <md-select required v-model="unavailableForm.tier" :disabled="!unavailableForm.unavailable">
            <md-option v-for="tier in tiers" :value="tier.priority">
              {{ tier.unavailabilityDescription }}
            </md-option>
          </md-select>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-spinner md-indeterminate v-show="unavailableForm.waitingForSubmit"></md-spinner>
        <md-button class="md-primary" @click.native="closeUnavailableForm">Cancel</md-button>
        <md-button class="md-primary" @click.native="updateUnavailability">Update</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import adminFetch from './admin-fetch'

  function addZero(num) {
    if (num < 10) return '0' + String(num)
    return String(num)
  }
  Object.assign(Date.prototype,
    {
      addDays(days) {
        return new Date(this.getTime() + 86400000 * days)
      },
      toHHMM() {
        return (
          String((this.getHours() + 11) % 12 + 1) +
          ':' +
          addZero(this.getMinutes())
        )
      },
      toShortDate() {
        return String(this.getMonth() + 1) + '/' + String(this.getDate())
      },
      toFullDate() {
        return String(this.getFullYear()) + '-' +
          addZero(this.getMonth() + 1) + '-' +
          addZero(this.getDate())
      }
    }
  )
  const now = new Date
  const makeTime = (hour, minute) =>
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute)
  const lastMonday = now.addDays(1 - now.getDay())
  function emptyUnavailableForm() {
    return {
      unavailable: true,
      reason: '',
      waitingForSubmit: false,
      tier: null
    }
  }

  export default {
    name: 'calendar-view',
    props: ['admin'],
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
        ],
        mondayDate: lastMonday,
        unavailabilities: {
          days: new Map,
          periods: new Map
        },
        visits: new Map,
        loading: false,
        unavailableForm: emptyUnavailableForm(),
        tiers: []
      }
    },
    computed: {
      maxPeriods() {
        let max
        for (const day of this.days) {
          const dayPeriods = day.periods.size
          if (max === undefined || dayPeriods > max) max = dayPeriods
        }
        return max
      },
      periods() {
        const periods = []
        for (let day = 0; day < this.days.length; day++) {
          let periodIndex = 0
          for (const [period, time] of this.days[day].periods) {
            if (!periods[periodIndex]) periods[periodIndex] = []
            periods[periodIndex][day] = {
              period,
              time,
              day: this.days[day]
            }
            periodIndex++
          }
        }
        return periods
      }
    },
    methods: {
      lastWeek() {
        this.mondayDate = this.mondayDate.addDays(-7)
      },
      today() {
        this.mondayDate = lastMonday
      },
      nextWeek() {
        this.mondayDate = this.mondayDate.addDays(7)
      },
      getWeekDay(date) {
        return this.days[date.getDay() - 1] //getDay() of 1 is Monday
      },
      getEvents() {
        this.loading = true
        adminFetch({
          url: '/api/admin/events/' + this.mondayDate.toFullDate(),
          handler: ({periods, days, visits}) => {
            const unavailablePeriods = new Map
            for (const {day, period: {period}, reason, tierPriority} of periods) {
              const dayPeriod = this.getWeekDay(new Date(day)).periods.get(period)
              unavailablePeriods.set(dayPeriod, {reason, tierPriority})
            }
            const unavailableDays = new Map
            for (const {day, reason, tierPriority} of days) {
              const weekDay = this.getWeekDay(new Date(day))
              unavailableDays.set(weekDay, {reason, tierPriority})
            }
            this.unavailabilities = {
              periods: unavailablePeriods,
              days: unavailableDays
            }
            const visitsMap = new Map
            for (const {college, period: {period}, scheduledDate} of visits) {
              const weekDay = this.getWeekDay(new Date(scheduledDate))
              const dayPeriod = weekDay.periods.get(period)
              visitsMap.set(dayPeriod, college)
            }
            this.visits = visitsMap
            this.loading = false
          },
          router: this.$router
        })
      },
      isUnavailablePeriod(period) {
        return (
          this.unavailabilities.periods.has(period.time) ||
          this.unavailabilities.days.has(period.day)
        )
      },
      isUnavailableDay(day) {
        return this.unavailabilities.days.has(day)
      },
      getUnavailableReason(period) {
        return (
          this.unavailabilities.periods.get(period.time) ||
          this.unavailabilities.days.get(period.day)
        ).reason || ''
      },
      openUnavailableForm({period, day}) {
        this.unavailableForm = emptyUnavailableForm()
        if (period) {
          if (this.unavailabilities.periods.has(period.time)) {
            this.unavailableForm.reason = this.getUnavailableReason(period)
            this.unavailableForm.tier = this.unavailabilities.periods.get(period.time).tierPriority
          }
          else {
            ({day} = period)
            period = null
          }
        }
        if (day && this.isUnavailableDay(day)) {
          this.unavailableForm.reason = this.unavailabilities.days.get(day).reason
          this.unavailableForm.tier = this.unavailabilities.days.get(day).tierPriority
        }
        else this.unavailableForm.tier = this.tiers[0].priority
        this.unavailableForm.target = {period, day}
        this.$refs.unavailableForm.open()
      },
      closeUnavailableForm() {
        this.$refs.unavailableForm.close()
      },
      updateUnavailability() {
        this.unavailableForm.waitingForSubmit = true
        setTimeout(() => { //will eventually actually send a request, so we simulate it here
          this.closeUnavailableForm()
          this.unavailableForm.waitingForSubmit = false
        }, 1000)
      },
      getTiers() {
        adminFetch({
          url: '/api/admin/tiers/unavailability',
          handler: ({tiers}) => this.tiers = tiers,
          router: this.$router
        })
      },
      getUnavailableText({day, period}) {
        let unavailability
        if (day) unavailability = this.unavailabilities.days.get(day)
        else if (period) {
          unavailability =
            this.unavailabilities.periods.get(period.time) ||
            this.unavailabilities.days.get(period.day)
        }
        const {reason} = unavailability
        if (reason) return 'Unavailable: ' + reason
        else return 'Unavailable'
      }
    },
    mounted() {
      this.getEvents()
      this.getTiers()
    },
    watch: {
      mondayDate() {
        this.getEvents()
      }
    }
  }
</script>

<style lang="sass" scoped>
  #week-toolbar
    justify-content: center

  .center
    text-align: center

  .unavailable
    background: #e74c3c !important

  .visiting
    background: #f1c40f !important

  .full-width
    flex-grow: 1
</style>
<style lang="sass">
  .less-padding > .md-table-cell-container
    padding: 6px !important
</style>
