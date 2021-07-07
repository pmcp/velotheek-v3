<template>
  <div
    class="container mx-auto max-w-xl text-left text-sm text-gray-600"
    v-if="action"
  >
    {{ action.observation.text }}
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: {
    activeCard: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data: function () {
    return {
      action: null,
    };
  },
  watch: {
    activeCard: function (newVal) {
      // watch it
      console.log('gonna parse');
      this.parseData(newVal);
    },
  },
  methods: {
    parseData(entry) {
      const action = {
        id: entry.gsx$id.$t,
        report: {
          text: entry.gsx$momentbeschrijving.$t,
        },
        phase: {
          order: entry.gsx$fasenummer.$t,
          name: entry.gsx$fasenaam.$t,
          descr: entry.gsx$fasebeschrijving.$t,
        },
        observation: {
          text: entry.gsx$opmerking.$t,
          context: entry.gsx$momentbeschrijving.$t,
        },
        action: {
          text: entry.gsx$actie.$t,
          context: entry.gsx$momentbeschrijving.$t,
        },
        mission: {
          title: entry.gsx$missienaam.$t,
          descr: entry.gsx$missiebeschrijving.$t,
        },
        persona: {
          name: entry.gsx$personanaam.$t,
          descr: entry.gsx$personabeschrijving.$t,
        },
        session: {
          date: entry.gsx$sessiedatum.$t,
        },
        user: {
          name: entry.gsx$gebruikernaam.$t,
          age: entry.gsx$gebruikerleeftijd.$t,
          // 'email': entry.gsx$.$t,
        },
        stakeholder: {
          name: entry.gsx$stakeholdernaam.$t,
          email: entry.gsx$stakeholderemail.$t,
          division: entry.gsx$stakeholderafdeling.$t,
          // 'email': entry.gsx$.$t,
        },
      };
      this.action = action;
    },
  },
};
</script>
