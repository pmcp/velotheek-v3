<template>
  <div class="mb-20">
    <card position="bottom" class="w-full h-full" open open-text="Close" close-text="Open" open-class="" close-class="">
      <template v-slot:opened>
        <ul class="divide-y divide-gray-200">
          <li v-for="(b, key) in bookings" :key="`${key}-bookings`" class="w-full">
            <booking-item :item="{data: b, key}" v-on:remove="removeFromBookingDb(b.rowId)"/>
          </li>
        </ul>
      </template>
    </card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    bookings: {
      type: Array,
      default: [],
    },
  },
  computed: {
    moments() {
      return this.$store.getters.moments
    },
    lang() {
      return this.$store.state.lang
    },
    date() {
      return this.$store.getters.date
    },
  },
  methods: {
    ...mapActions(['removeFromBookingDb']),
  },
}
</script>
