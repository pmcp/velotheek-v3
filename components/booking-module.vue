<template>
  <card  class="w-full" open open-text="Close" close-text="Open" open-class="" close-class="">
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
              <span class="text-gray-600 font-bold"><translation :id="15" />: </span>
            </div>
          </template>
        </FormulateInput>
        <booking-calendar class="z-20" />
        <booking-moments class="z-10" />
      </div class="px-5">
    </template>
  </card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeGrade: null,
    }
  },
  computed: {
    ...mapGetters({
      grades: 'gradesForUser',
    })
  },
  methods: {
    ...mapActions(['setActiveGrade']),
  }
}
</script>
