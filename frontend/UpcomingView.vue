<template>
  <div>
    <md-toolbar class="md-warn">
      <h2 class="md-title">Upcoming</h2>
      <md-spinner md-indeterminate md-size="40" class="md-accent" v-if="loading"></md-spinner>
    </md-toolbar>
    <md-whiteframe md-elevation="2">
      <md-list>
        <md-list-item v-for="visit in upcoming">
          <md-icon>event_available</md-icon>
          <span>
            {{ visit.college }}
            -
            {{ visit.scheduledTimeStart.toUpcomingString() }}
          </span>
        </md-list-item>
      </md-list>
    </md-whiteframe>
  </div>
</template>

<script>
  function addZero(num) {
    if (num < 10) return '0' + String(num)
    return String(num)
  }
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  Date.prototype.toUpcomingString = function() {
    return (
      MONTHS[this.getMonth()] +
      ' ' +
      String(this.getDate()) +
      ' at ' +
      String(this.getHours()) +
      ':' +
      addZero(this.getMinutes())
    )
  }

  export default {
    name: 'upcoming-view',
    data() {
      return {
        upcoming: [],
        loading: true
      }
    },
    mounted() {
      setTimeout(() => {
        this.loading = false
        this.upcoming = [
          {college: 'NYU', scheduledTimeStart: new Date(2017, 4,  5, 10, 25)},
          {college: 'CMU', scheduledTimeStart: new Date(2017, 4,  8,  8, 30)},
          {college: 'USC', scheduledTimeStart: new Date(2017, 4,  9, 11, 35)},
          {college: 'MIT', scheduledTimeStart: new Date(2017, 4, 11,  3, 25)},
          {college: 'LSU', scheduledTimeStart: new Date(2017, 4, 12,  2,  5)}
        ]
      }, 500)
    }
  }
</script>