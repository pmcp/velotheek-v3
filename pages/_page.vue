<template>
  <main class="relative bg-gray-50">
    <template v-if="content.title === 'Home'">
      <div class="flex flex-col md:flex-row">
        <div class="relative flex md:w-1/2 mr-4 bg-pink-500 justify-items-stretch items-stretch">

          <img class="object-cover" :src="content.image" alt="" />
          <div class="absolute w-full h-full top-0 left-0 flex justify-center items-center p-5">
            <svg-logo class="text-white" />
          </div>
        </div>
        <div class="pb-20 md:w-1/2 ml-4 mt-5">
          <heading-one>
            {{ content.intro }}
          </heading-one>
          <div class="prose prose-indigo prose-lg text-gray-500 mx-auto">
            <nuxt-content class="prose lg:prose-xl" :document="content" />
          </div>

          <div class="mt-10 sm:flex sm:justify-center lg:justify-start" v-if="user">
            <div class="rounded-md shadow">
              <nuxt-link
                :to="`/locations/4saisons.${lang}`"
                class="
                  bg-pink-100
                  border-2
                  text-pink-500
                  border-pink-500
                  hover:bg-pink-500 hover:text-pink-100
                  rounded
                  p-4
                "
              >
                <translation :id="14" class="" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
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
    </template>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // TODO: Check all heads
  computed: {
    lang() {
      return this.$store.state.lang
    },
    ...mapGetters({
      user: 'auth/user',
    }),
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
