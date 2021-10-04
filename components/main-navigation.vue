<template>
  <div class="flex flex-row justify-between">
    <!-- TODO: Problems with hydration, so made it client only. Makes no sense. -->

    <!-- HINT: If you put a v-if on a nuxt-link, it breaks hydration, so I'm using display none (class 'hidden') -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
      <nuxt-link :to="`/homepage.${lang}`">
        <span class="underline text-gray-600 hover:text-gray-900 mr-5">Home</span>
      </nuxt-link>

      <div v-if="user">
        <nuxt-link v-for="(p, key) in pages" :key="`navPages-${key}`" :to="`/${p.slug}`">
          <div
            class="underline mr-5"
            :class="[
              $route.path == `/${p.slug}` ? 'text-pink-500  hover:text-pink-900' : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            {{ p.title }}
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="flex flex-col md:flex-row md:justify-between md:items-center" :class="{ hidden: !user }">
      <nuxt-link
        :to="`/locations/4saisons.${lang}`"
        class="text-gray-600 hover:text-gray-900 mr-5 underline px-1 py-1 md:py-3 md:px-2 rounded"
        :class="[$route.path.includes('/locations/') ? 'border-2 border-pink-500' : '']"
      >
        <translation :id="14" class="" />
      </nuxt-link>

      <!-- HINT: If you put a v-if on a nuxt-link, it breaks hydration, so I'm using display none (class 'hidden') -->
        <nuxt-link
          :to="`/bookings.${lang}`"
          class="text-gray-600 hover:text-gray-900 mr-5 underline px-1 py-1 md:py-3 md:px-2 rounded"
          :class="[$route.path == `/bookings.${lang}` ? 'border-2 border-pink-500' : '']"
        >
          <translation :id="7" /> ({{ userBookings }})
        </nuxt-link>

    </div>
    <div class="py-2 flex flex-col md:flex-row justify-between md:justify-center">
      <user />
      <language-toggle class="ml-5" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
export default {
  data() {
    return {
      allPages: [],
    }
  },

  async mounted() {
    this.allPages = await this.$content('pages').only(['title', 'slug']).fetch()
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    pages() {
      if (this.allPages.length < 1) return []
      return this.allPages.filter((p) => p.slug.slice(-2) === this.lang && p.title !== 'Home')
    },
    userBookings() {
      if (this.$store.getters.userBookings) return this.$store.getters.userBookings.length
    },
    ...mapGetters({
      user: 'auth/user',
    }),
  },
}
</script>
