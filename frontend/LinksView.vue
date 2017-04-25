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
          <md-table-cell>
            <a v-bind:href="link.url">
              {{ link.uuid }}
            </a>
          </md-table-cell>
          <md-table-cell>
            <span v-if="link.lastSignedIn">
              Last signed in on
              {{ link.lastSignedIn.getMonth() + 1 }}/{{ link.lastSignedIn.getDate() }}
            </span>
            <span v-else>
              Never logged in
            </span>
          </md-table-cell>
          <md-table-cell @click.native="openNotes(link)">
            <span :class="link.notesFromCollegeSeen ? null : 'unseen'">
              {{ link.shortenedNotes }}
            </span>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>

    <md-dialog-alert :md-content='selectedNotes' md-ok-text="Close" ref="notesDialog">
    </md-dialog-alert>
  </div>
</template>

<script>
  const MAX_NOTES_LENGTH = 40
  const ELLIPSIS = '...'
  class Link {
    constructor({college, repName, uuid, lastSignedIn, notesFromCollege, notesFromCollegeSeen}) {
      this.college = college
      this.repName = repName
      this.uuid = uuid
      this.lastSignedIn = lastSignedIn
      this.notesFromCollege = notesFromCollege
      this.notesFromCollegeSeen = notesFromCollegeSeen
    }
    get url() {
      return '/' + this.uuid
    }
    get shortenedNotes() {
      const notes = this.notesFromCollege
      if (notes.length > MAX_NOTES_LENGTH) {
        return notes.substring(0, MAX_NOTES_LENGTH - ELLIPSIS.length) + ELLIPSIS
      }
      else return notes
    }
  }
  export default {
    name: 'links-view',
    data() {
      return {
        links: [
          new Link({
            college: 'Swarthmore',
            repName: 'Josh Throckmorton',
            uuid: 'abcdef',
            lastSignedIn: null,
            notesFromCollege: 'Long notes string, hoping this gets cut off',
            notesFromCollegeSeen: true
          }),
          new Link({
            college: 'UMass Amherst',
            repName: null,
            uuid: '123456',
            lastSignedIn: new Date,
            notesFromCollege: 'Blah blah blah',
            notesFromCollegeSeen: false
          })
        ],
        selectedNotes: "Click on a college's notes" //should never be shown to the user
      }
    },
    methods: {
      openNotes(link) {
        this.selectedNotes = link.notesFromCollege
        this.$refs.notesDialog.open()
      }
    }
  }
</script>

<style lang="sass" scoped>
  span.unseen
    background: yellow
</style>