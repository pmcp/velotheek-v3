<template>
  <card class="w-full border-2 rounded-md bg-pink-50 border-pink-500" open>
    <template v-slot:opened>
      <div class="px-5 pb-5">
        <FormulateInput
          :options="grades"
          type="select"
          placeholder="Selecteer"
          v-model="activeGrade"
          @input="setActiveGrade"
        >
          <template #label="{ id }">
            <div class="pb-2">
              <heading-two>
                <translation :id="15" />
              </heading-two>
            </div>
          </template>
        </FormulateInput>
        <div class="flex justify-between items-center">
          <heading-two class="pb-2 mt-5">
            <translation :id="18" />
          </heading-two>
          <button @click="legendeOpen = !legendeOpen" v-if="legendeOpen" class="z-10  rounded-t-lg mt-2 text-pink-500 italic text-sm bg-pink-200 border-2 px-2 py-1 text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-pink-100"><translation :id="27" /></button>
          <button @click="legendeOpen = !legendeOpen" v-else class="z-10 mt-2 rounded text-pink-500 italic text-sm bg-pink-100 border-2 px-2 py-1 text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-pink-100"><translation :id="26" /></button>

        </div>
        <custom-transition>
          <card v-if="legendeOpen" class="w-full border-2 rounded-b-lg  bg-pink-50 border-pink-500 mb-5 -top-2 relative" open>
            <template v-slot:opened>
              <booking-legend class="p-5"/>
            </template>
          </card>
        </custom-transition>
        <booking-calendar class="z-20" />

        <booking-moments class="z-10" />
      </div>
    </template>
  </card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeGrade: null,
      legendeOpen: false
    }
  },
  computed: {
    ...mapGetters({
      grades: 'gradesForUser',
    }),
  },
  methods: {
    ...mapActions(['setActiveGrade']),
  },
}
</script>
