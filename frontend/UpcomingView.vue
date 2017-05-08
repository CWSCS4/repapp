<template>
  <div>
    <md-toolbar class="md-accent">
      <h2 class="md-title">Upcoming</h2>
      <md-spinner md-indeterminate md-size="40" class="md-accent" v-if="loading"></md-spinner>
    </md-toolbar>
    <md-whiteframe md-elevation="2">
      <md-list>
        <md-list-item v-for="visit in upcoming">
          <md-icon>event_available</md-icon>
          <a :href="'/' + visit.uuid">
            {{ visit.college }}
            -
            {{ visit.scheduledTimeStart.toUpcomingString() }}
          </a>
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
      String((this.getHours() + 11) % 12 + 1) +
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
          {college: 'NYU', uuid: '123456', scheduledTimeStart: new Date(2017, 4,  5, 10, 25)},
          {college: 'CMU', uuid: '234561', scheduledTimeStart: new Date(2017, 4,  8,  8, 30)},
          {college: 'USC', uuid: '345612', scheduledTimeStart: new Date(2017, 4,  9, 11, 35)},
          {college: 'MIT', uuid: '456123', scheduledTimeStart: new Date(2017, 4, 11, 15, 25)},
          {college: 'LSU', uuid: '561234', scheduledTimeStart: new Date(2017, 4, 12, 14,  5)}
        ]
      }, 500)
    }
  }
</script>