<template>
  <div>
    <div class="flex min-h-screen">
      <div class="pt-1 w-3/5">
<!--        <heading-two>-->
<!--          <translation :id="16" />-->
<!--        </heading-two>-->
        <locations-list class=" sticky top-20 z-20" :horizontal="true" />
        <heading-two class="mt-10">
          <translation :id="17" />
        </heading-two>
        <location-content :content="location" />
      </div>

      <div class="pl-6 w-2/5">
        <div class="sticky top-20  mb-20">
          <booking-module />
        </div>
      </div>
    </div>
    <div class="sticky bottom-0 w-full z-30" :class="{ hidden: !user }">
      <div class="flex items-center relative w-full">
        <bookings-session />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HeadingTwo from '~/components/heading-two'

export default {
  components: { HeadingTwo },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css',
      },
    ],
  },
  async asyncData({ $content, params, error, payload }) {
    //TODO: Fix differently
    if (payload) {
      return { location: payload }
    } else {
      const location = await $content('locations', params.location).fetch()
      return { location: location }
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions([
      'setLocation'
    ]),
  },
  mounted() {
    this.setLocation(this.location.idInSheet)
  },
}
</script>
