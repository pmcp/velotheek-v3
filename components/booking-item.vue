<template>
  <div>
    <div v-if="item" class="flex items-center items-stretch">
      <div class="bg-pink-100 text-pink-500 px-5 md:px-0 w-20 md:w-40 flex justify-center items-center">
        <booking-date :date="new Date(item.data.date)" />
      </div>
      <div class="flex-1 flex flex-col md:flex-row md:pt-3 px-2 md:py-2">
        <div class="mt-2 flex text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            style="margin-top: 0.1rem"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p class="text-xs text-gray-500">
            <span class="font-sm font-semibold">{{ moments[item.data.moment].name[lang] }}</span>
            <span class="block hidden md:block">{{ moments[item.data.moment].descr[lang] }}</span>
          </p>
        </div>

        <div class="md:ml-8 mt-1 md:mt-2 flex text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            style="margin-top: 0.1rem"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <location-address class="text-xs text-gray-500" :location="item.data.location" />
        </div>

        <div v-if="item.data.grade.length > 0" class="md:ml-8 mt-1 md:mt-2 flex text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          <p>
            <span class="font-sm text-xs">{{ item.data.grade }}</span>
          </p>
        </div>
      </div>
      <div class="group flex items-center px-2 py-2">
        <button
          @click="$emit('remove', 0.1)"
          class="
            rounded-lg
            p-2
            md:p-3
            border-2 border-bg-gray-400
            text-xs
            md:text-sm
            text-gray-700
            hover:bg-pink-100 hover:border-pink-500 hover:
            text-pink-500
          "
        >
          <translation :id="32" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    default: {},
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    moments() {
      return this.$store.getters.moments
    }
  }
}
</script>

<style scoped></style>
