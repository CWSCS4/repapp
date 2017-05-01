<template>
  <md-layout md-gutter="8">
    <md-layout md-flex="80">
      <calendar-view admin="true"></calendar-view>
    </md-layout>
    <md-layout>
      <upcoming-view></upcoming-view>
    </md-layout>
  </md-layout>
</template>

<script>
  import CalendarView from './CalendarView.vue'
  import UpcomingView from './UpcomingView.vue'

  export default {
    name: 'calendar-page',
    components: {
      CalendarView,
      UpcomingView
    }
  }
</script>