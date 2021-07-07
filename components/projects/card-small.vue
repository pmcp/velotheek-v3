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
      
      this.parseData(newVal);
    },
  },
  methods: {
    parseData(entry) {
      
      const action = {
        id: entry.Id,
        report: {
          text: entry['Moment Beschrijving'],
        },
        phase: {
          order: entry['Fase Nummer'],
          name: entry['Fase Naam'],
          descr: entry['Fase Beschrijving'],
        },
        observation: {
          text: entry['Opmerking'],
          context: entry['Moment Id'],
        },
        action: {
          text: entry['Actie'],
          context: entry['Moment Beschrijving'],
        },
        persona: {
          name: entry['Persona Naam'],
          descr: entry['Persona Id'],
        },
        session: {
          date: entry['Sessie Datum'],
        },
        user: {
          name: entry['Gebruiker Naam'],
          age: entry['Gebruiker Leeftijd'],
          // 'email': entry.gsx$.$t,
        },
        stakeholder: {
          name: entry['Stakeholder Naam'],
          email: entry['Stakeholder Email'],
          division: entry['Stakeholder Afdeling'],
          // 'email': entry.gsx$.$t,
        },
      };
      this.action = action;
    },
  },
};
</script>
