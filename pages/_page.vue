<template>
  <main class="relative bg-gray-50">
    
    <div>
      <div class="text-base max-w-prose pt-10">
        <h1
          class="
            py-5
            text-4xl
            tracking-tight
            font-extrabold
            text-gray-900
            sm:text-5xl
            md:text-6xl
            lg:text-5xl
            xl:text-6xl
            mb-10
          "
        >
          <span class="block xl:inline whitespace-pre">{{ content.title }}</span>
        </h1>

        <nuxt-content :document="content" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  // TODO: Check all heads
  computed: {
    lang() {
      return this.$store.state.lang
    },
    ...mapGetters({
      user: 'auth/user',
    })
  },
  methods: {
    ...mapActions({
      openLogin: 'auth/openLogin',
    }),
  },
  async asyncData({ $content, params, error, payload }) {
    if (payload) {
      return { content: payload }
    } else {
      const page = await $content('pages', params.page).fetch()
      return { content: page }
    }
  },
}
</script>
