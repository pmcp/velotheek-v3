<template>
  <div class="relative px-3">
    <div class="w-full h-80">
      <card
        position="bottom"
        class="w-full h-full"
        open
        open-text="Close"
        close-text="Open"
        open-class=""
        close-class=""
      >
        <template v-slot:opened>
          <div class="w-full h-full">
            <location-map />
          </div>
        </template>
      </card>

      <div class="absolute top-0 left-0 w-1/4 h-full ml-5">
        <div class="mt-5">
          <locations-list />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
