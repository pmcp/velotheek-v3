<template>
  <div class="w-full relative">
    <custom-transition :id="1">
      <div
        v-if="open"
        class="
          relative
          z-10
          bg-white
          border-gray-400
          shadow
          rounded-t-lg
          overflow-hidden
          mx-2
          max-h-128
          overflow-y-auto
        "
      >
        <ul class="w-full divide-y divide-gray-200">
          <custom-transition-group>
              <li v-for="(b, key) in sessionBookings" :key="`${key}-sessionBookings`" class="w-full">
                <booking-item :item="{data: b, key}" v-on:remove="removeFromBookingsSelection(key)"/>
              </li>
          </custom-transition-group>
        </ul>
      </div>
    </custom-transition>
    <div class="relative z-20 flex justify-between items-center bg-white border-gray-300 shadow  md:rounded-t-lg">
      <div v-if="sessionBookings.length < 1" class="text-gray-700 text-sm md:text-md hover:text-pink-500 italic pl-2 md:pl-8">
        <translation :id="13" />
      </div>
      <div v-else>
        <button v-if="!open" class="underline text-gray-700 hover:text-pink-500  pl-4 text-left" @click="open = !open">
          <translation :id="11" /> ({{ sessionBookings.length }})
        </button>

        <button v-else class=" underline text-gray-700 hover:text-pink-500  pl-4 text-left" @click="open = !open">
          <translation :id="12" /> ({{ sessionBookings.length }})
        </button>
      </div>

      <button
        class="bg-pink-100 border-2 text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-pink-100 font-bold py-2 px-4 rounded m-4"
        :class="{ 'opacity-50': !canSendBookingToDatabase }"
        :disabled="!canSendBookingToDatabase"
        @click="createBooking"
      >
        <span v-if="activeStatus === 0"> <translation :id="6" /></span>

        <span v-else>{{ statusDescription }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return { open: true }
  },
  computed: {
    sessionBookings() {
      return this.$store.state.sessionBookings
    },
    lang() {
      return this.$store.state.lang
    },
    locations() {
      return this.$store.state.locations
    },
    date() {
      return this.$store.getters.date
    },
    canSendBookingToDatabase() {
      return this.$store.getters.canSendBookingToDatabase
    },
    activeStatus() {
      return this.$store.state.activeStatus
    },
    statusDescription() {
      return this.$store.getters.statusDescription
    },
    grades() {
      return this.$store.state.grades
    },
  },
  methods: {
    toggle() {
      this.open = !this.open
    },

    getLocationById(id) {
      const filteredLocations = this.locations[this.lang].filter((l) => l.idInSheet === id)
      return filteredLocations[0]
    },
    ...mapActions(['removeFromBookingsSelection', 'createBooking']),
  },
}
</script>
