<template>
  <div class="flex flex-col md:flex-row md:justify-center md:items-center">
    <!-- TODO: Problems with hydration, so made it client only. Makes no sense. -->

    <!-- HINT: If you put a v-if on a nuxt-link, it breaks hydration, so I'm using display none (class 'hidden') -->
    <nuxt-link :to="`/homepage.${lang}`">
      <span class="underline text-gray-600 hover:text-gray-900 mr-5">Home</span>
    </nuxt-link>

    <nuxt-link v-for="(p, key) in pages" :key="`navPages-${key}`" :to="`/${p.slug}`">
      <span class="underline text-gray-600 hover:text-gray-900 mr-5">{{ p.title }}</span>
    </nuxt-link>

    <nuxt-link :to="`/locations/4saisons.${lang}`">
      <translation :id="14" class="underline text-gray-600 hover:text-gray-900 mr-5" :class="{ hidden: !user }" />
    </nuxt-link>

    <!-- HINT: If you put a v-if on a nuxt-link, it breaks hydration, so I'm using display none (class 'hidden') -->
    <nuxt-link
      :to="`/bookings.${lang}`"
      class="mr-5 underline text-gray-600 hover:text-gray-900"
      :class="{ hidden: !user }"
    >
      <translation :id="7" /> ({{ userBookings }})
    </nuxt-link>
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
