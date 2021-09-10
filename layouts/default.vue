<template>
  <div class="relative max-w-6xl mx-auto mt-5">
    <div class="sticky top-0 z-20 bg-white pb-2">
      <div class="flex flex-row justify-end">
                    <main-navigation />
                    <user />
                    <language-toggle class="ml-5" />
      </div>
    </div>

    <nuxt class="min-h-screen" />




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