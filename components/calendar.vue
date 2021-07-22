<template>
  <div>
  <no-ssr>
	  <v-date-picker
  		mode="range"
		:value="activeDate"
		@input="setActiveDate($event)"
		:disabled-dates="disabledDates"
		:attributes="calAttributes"
		:min-date="new Date()"
		show-caps
	  />
	</no-ssr>
  </div>
</template><script>
import { mapActions } from 'vuex';
export default {

computed: {
	activeDate(){
	  return this.$store.state.activeDate
	},
	disabledDates(){
		// TODO: might also need to be computed
		return this.$store.state.disabledDates
	},
	calAttributes(){
	  return this.$store.getters.calAttributes
	},
},
 methods: {
	 ...mapActions({
	   setActiveDate: 'setActiveDate',
	 }),
}
}
</script>
