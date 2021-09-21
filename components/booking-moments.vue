<template>
  <div>
    <custom-transition :id="2">
      <div v-if="activeDate != null && activeGrade != null" class="bg-gray-50 border border-gray-200 rounded-lg pt-4 w-full relative -top-5">
        <ul class="divide-y divide-gray-200 relative">
          <li>
            <div class="px-4 py-4 sm:px-6">
              <div class="italic">
                <p class="text-md text-gray-400 mt-3"><translation :id="31" class="font-bold"/>: {{ activeGrade }}</p>
                <p class="text-md text-gray-400 mb-5"><translation :id="19" class="font-bold" />: {{ activeDateReadable }}</p>
              </div>
              <heading-two>
                <translation :id="2" />
              </heading-two>

              <p class="mt-1 text-sm text-gray-400"><translation :id="1" /></p>
            </div>
          </li>

          <li v-for="(l, key) in moments" :key="`${key}-sessionBookings`">
            <div
              v-if="key == 2"
              class="w-full hover:bg-white flex px-4 py-4 sm:px-6"
              :class="{ 'opacity-50': !moments[0].available || !moments[1].available }"
            >
              <div class="flex-1 flex">
                <div class="flex flex-col">
                  <p class="text-sm font-medium text-gray-700">{{ l.name[lang] }}</p>
                  <p class="mt-1 text-sm text-gray-400 italic">
                    {{ l.descr[lang] }}
                  </p>
                </div>
              </div>
              <div class="group">
                <button
                  @click="selectMoment(key)"
                  :disabled="activeDate == null || !moments[0].available || !moments[1].available"
                  class="
                    rounded-lg
                    text-pink-500
                    italic
                    text-sm
                    bg-pink-100
                    border-2
                    px-2
                    py-2
                    mt-1
                    text-pink-500
                    border-pink-500
                    hover:bg-pink-500 hover:text-pink-100
                  "
                >
                  <translation :id="29" />
                </button>
              </div>
            </div>

            <div v-else class="w-full hover:bg-white flex px-4 py-4 sm:px-6" :class="{ 'opacity-50': !l.available }">
              <div class="flex-1 flex">
                <div class="flex flex-col">
                  <p class="text-sm font-medium text-gray-700">{{ l.name[lang] }}</p>
                  <p class="mt-1 text-sm text-gray-400 italic">
                    {{ l.descr[lang] }}
                  </p>
                </div>
              </div>

              <div class="group">
                <button
                  @click="selectMoment(key)"
                  :disabled="activeDate == null || !l.available"
                  class="
                    rounded-lg
                    text-pink-500
                    italic
                    text-sm
                    bg-pink-100
                    border-2
                    px-2
                    py-2
                    mt-1
                    text-pink-500
                    border-pink-500
                    hover:bg-pink-500 hover:text-pink-100
                  "
                >
                  <translation :id="29" />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </custom-transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    translations() {
      return this.$store.state.translations
    },
    moments() {
      return this.$store.getters.moments
    },
    lang() {
      return this.$store.state.lang
    },
    activeMoment() {
      return this.$store.state.activeMoment
    },
    activeDate() {
      return this.$store.state.activeDate
    },
    activeDateReadable() {
      return this.$store.getters.activeDateReadable
    },
    activeGrade() {
      return this.$store.state.activeGrade
    },
  },
  methods: {
    ...mapActions(['selectMoment']),
  },
}
</script>
