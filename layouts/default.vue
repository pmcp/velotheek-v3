<template>
  <div class="bg-gray-50">
    <div class="bg-white sticky top-0 z-50 shadow-sm mb-5">
      <div class="relative max-w-6xl mx-auto">
        <div class="flex justify-between">
          <main-navigation />
          <div class="flex">
            <user />
            <language-toggle class="ml-5" />
          </div>
        </div>
      </div>
    </div>
    <nuxt class="max-w-6xl mx-auto min-h-screen" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    sessionBookings() {
      return this.$store.state.sessionBookings
    },
  },
  methods: {
    ...mapActions(['getLocations', 'getTranslations', 'getBookings']),
  },
  mounted() {
    // Backups for if the data hasn't been loaded. Should probably think about a better flow
    if (!this.locations) {
      this.getLocations()
    }

    if (!this.translations) {
      this.getTranslations()
    }

    if (!this.bookings) {
      this.getBookings()
    }
  },
}
</script>
