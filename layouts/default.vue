<template>
  <div class="bg-gray-50">
    <div class="bg-white md:sticky top-0 z-50 shadow-sm mb-5">
      <div class="relative max-w-6xl mx-auto px-4">
        <!-- TODO: Had to put this in client only because of hidration issues: should optimize -->
        <client-only>
          <main-navigation />
        </client-only>
      </div>
    </div>
    <nuxt class="max-w-6xl mx-auto min-h-screen px-4" />
    <client-only>
      <custom-transition :id="1">
        <div v-if="user && $route.name === 'locations-location'" class="sticky bottom-0 w-full z-30">
          <bookings-session class="max-w-6xl mx-auto md:px-4" />
        </div>
      </custom-transition>
    </client-only>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    sessionBookings() {
      return this.$store.state.sessionBookings
    },
    ...mapGetters({
      user: 'auth/user',
    }),
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
