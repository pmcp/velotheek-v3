<template>
  <div class="w-full">
    <transition enter-active-class="duration-200 ease-out"
                enter-class="-translate-x-full opacity-0"
                enter-to-class="translate-x-0 opacity-100"
                leave-active-class="duration-200 ease-in"
                leave-class="translate-x-0 opacity-100"
                leave-to-class="-translate-x-full opacity-0">
    <div v-if="open" class="bg-blue-100 border-gray-300 shadow rounded-t-lg overflow-hidden mx-2 max-h-128 overflow-y-auto">
    <ul class="w-full divide-y divide-gray-200 " >
      <li v-for="(b, key) in sessionBookings" :key="`${key}-sessionBookings`" class='"w-full'>
        <!-- TODO: Make component (cos also in bookings page) -->
        <div >
          <div class="flex items-center items-stretch">
            <div class="p-8 bg- bg-blue-200 w-40 flex items-center"><booking-date :date="new Date(b.date)" /></div>
            <div class="flex-1 flex flex-row px-4 py-4 sm:px-6">
              <div class="mt-2 flex text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  style="margin-top: 0.1rem"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p class="text-sm text-gray-500">
                  <span class="font-sm font-semibold">{{ moments[b.moment].name[lang] }}</span>
                  <span class="block">{{ moments[b.moment].descr[lang] }}</span>
                </p>
              </div>

              <div class="ml-8 mt-2 flex text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  style="margin-top: 0.1rem"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <location-address :location="b.location" />
              </div>
            </div>
            <div class="group flex items-center px-4 py-4 sm:px-6">
              <button
                @click="removeFromBookingsSelection({ key })"
                class="rounded-full p-3 border-2 border-blue-700 group-hover:bg-red-100 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    </div>
    </transition>
    <div class="flex justify-between bg-blue-500 border-gray-300 shadow rounded-t-lg">

      <h2 class="text-xl p-4 pl-8">
        <translation :id="5" class="text-white"/>
        <span class="text-base align-top text-white">({{ sessionBookings.length }})</span>
      </h2>

<!--      <div class="italic text-base font-bold">-->
<!--        <translation :id="3" />-->
<!--      </div>-->
<!--      <div class="italic">-->
<!--        <translation :id="4" />-->
<!--      </div>-->

      <button
        v-if="!open"
        class="m-4 underline text-white font-bold py-2 px-4 rounded"
        @click="open = !open"
      >
        <translation :id="11" />


      </button>


      <button
        v-else
        class="m-4 underline text-white font-bold py-2 px-4 rounded"
        @click="open = !open"
      >
        <translation :id="12" />


      </button>

        <button
          class="m-4  bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
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
    moments() {
      return this.$store.getters.moments
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
