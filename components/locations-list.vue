<template>
  <card position="bottom" class="w-full" open open-text="Close" close-text="Open" open-class="" close-class="">
    <template v-slot:opened>
      <div class="flex">
        <div v-for="(l, key) in locations" :key="`${key}-locations`" class="flex-grow p-2">
          <nuxt-link :to="l.path">
            <div
              class="rounded px-3 py-2 h-full w-full "
              :class="{ 'border-2 border-pink-500': l.idInSheet === activeLocationId, 'border border-gray-400': l.idInSheet !== activeLocationId }"
            >
              <!-- <h3 class="">{{ l.title }}</h3> -->
              <location-address :location="l.idInSheet" />
            </div>
          </nuxt-link>
        </div>
      </div>
    </template>
    <template v-slot:closed> </template>
  </card>
</template>

<script>
export default {
  props: {
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    locations() {
      return this.$store.getters.localisedLocations
    },
    activeLocationId() {
      return this.$store.state.activeLocationId
    },
  },
}
</script>
