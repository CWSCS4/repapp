<template>
  <div>
    <router-link tag="md-button" to="/admin/links/new" class="md-raised md-primary">
      New Link
    </router-link>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>College</md-table-head>
          <md-table-head>Rep name</md-table-head>
          <md-table-head>Link</md-table-head>
          <md-table-head>Status</md-table-head>
          <md-table-head>Notes</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(link, index) in links">
          <md-table-cell>
            <b>{{ link.college }}</b>
          </md-table-cell>
          <md-table-cell>
            <span v-if="link.repName">
              {{ link.repName }}
            </span>
          </md-table-cell>
          <md-table-cell></md-table-cell>
          <md-table-cell></md-table-cell>
          <md-table-cell></md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </div>
</template>

<script>
  export default {
    name: 'links-view',
    data() {
      return {
        links: [
          {
            college: 'Swarthmore',
            repName: null,
            uuid: 'abcdef',
            lastSignedIn: null,
            notesFromCollege: null,
            notesFromCollegeSeen: true
          },
          {
            college: 'UMass Amherst',
            repName: 'Josh Throckmorton',
            uuid: '123456',
            lastSignedIn: new Date,
            notesFromCollege: 'Blah blah blah',
            notesFromCollegeSeen: false
          }
        ]
      }
    }
  }
</script>