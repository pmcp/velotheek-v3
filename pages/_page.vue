<template>
  <main class="relative bg-gray-50">
    <div class="lg:relative">
      <div class="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div class="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
          <h1
            class="
              text-4xl
              tracking-tight
              font-extrabold
              text-gray-900
              sm:text-5xl
              md:text-6xl
              lg:text-5xl
              xl:text-6xl
            "
          >
            <span class="block xl:inline">{{ content.title }}</span>
          </h1>
          <p class="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            {{ content.intro }}
          </p>
          <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
              <nuxt-link
                :to="`/locations/4saisons.${lang}`"
                class="
                  w-full
                  flex
                  items-center
                  justify-center
                  px-8
                  py-3
                  border border-transparent
                  text-base
                  font-medium
                  rounded-md
                  text-white
                  bg-blue-600
                  hover:bg-indigo-700
                  md:py-4 md:text-lg md:px-10
                "
              >
                <translation :id="6" class="" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      HIER {{ content }}
      <div class="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <img class="absolute inset-0 w-full h-full object-cover" :src="content.image" alt="" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  // TODO: Check all heads
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
  async asyncData({ $content, params, error, payload }) {
    if (payload) {
      return { page: payload }
    } else {
      const page = await $content('pages', params.page).fetch()
      return { content: page }
    }
  },
}
</script>
