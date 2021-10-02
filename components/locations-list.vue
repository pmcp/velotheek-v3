<template>
  <div class="flex gap-4">
    <div v-for="(l, key) in locations" :key="`${key}-locations`" class="flex-grow rounded-md p-px bg-gray-100 "
         :class="{ 'border-2 border-pink-500': l.idInSheet === activeLocationId, 'border-2 border-gray-100': l.idInSheet !== activeLocationId }">
      <nuxt-link :to="l.path">
        <div
          class="rounded px-3 py-2 h-full w-full border border-gray-400 bg-white"

        >
          <!-- <h3 class="">{{ l.title }}</h3> -->
          <location-address :location="l.idInSheet" />
        </div>
      </nuxt-link>
    </div>
  </div>
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
