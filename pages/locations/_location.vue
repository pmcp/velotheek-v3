<template>
  <div>
    <div class="flex flex-col md:flex-row min-h-screen">
      <div class="pt-1 w-full">
        <heading-two class="mb-3">
          <translation :id="35" />
        </heading-two>
        <locations-list class="text-sm text-gray-500 md:sticky top-20 z-20" :horizontal="true" />
        <heading-two class="mt-5">
          <translation :id="17" />
        </heading-two>
<!--        <location-content class="hidden md:block" :content="location" />-->
        <div >
          <div class="h-10 md:h-auto md:mb-0" :class="{ 'overflow-hidden h-auto': showContent }">
            <location-content :content="location" />
          </div>
          <div class="relative z-10 w-full">
            <div
              class="h-40 readMoreGradient"
              :class="{ ' h-auto': showContent }"
            ></div>
            <div class="bg-gray-50 h-10">
              <button
                @click="showContent = !showContent"
                class="italic bg-white text-gray-500 rounded border border-gray-500 py-1 px-2 hover:bg-gray-200"
              >
                <translation v-if="showContent" :id="34" />
                <translation v-else :id="33" />
              </button>
            </div>
            <div class="bg-gray-50 h-10"></div>
          </div>
        </div>
      </div>

      <div class="md:pl-6 w-full">
        <div class="sticky top-20 mb-20">
          <booking-module />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HeadingTwo from '~/components/heading-two'
import Translation from '~/components/translation'

export default {
  components: { Translation, HeadingTwo },
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
  data() {
    return {
      showContent: false,
    }
  },
  methods: {
    ...mapActions(['setLocation']),
  },
  mounted() {
    this.setLocation(this.location.idInSheet)
  },
}
</script>
