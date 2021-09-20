<template>
  <card  class="w-full" open open-text="Close" close-text="Open" open-class="" close-class="">
    <template v-slot:opened>
      <div class="p-5">
        <FormulateInput
          :options="grades"
          type="select"
          placeholder="Selecteer"
          v-model="activeGrade"
          @input="setActiveGrade"
        >
          <template #label="{ id }">
            <div class="pb-2">
              <span class="font-semibold"><translation :id="15" />: </span>
            </div>
          </template>
        </FormulateInput>
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
