<template>
  <!-- TODO: Disable when not logged in -->
  <client-only>
	  <v-date-picker
		:value="activeDate"
		@input="setActiveDate($event)"
		:disabled-dates="disabledDates"
		:attributes="calAttributes"
		:min-date="new Date()"
		show-caps
	    is-expanded 
	  />
	</client-only>
</template>
<script>
import { mapActions } from 'vuex';
export default {

computed: {
	activeDate(){
	  return this.$store.state.activeDate
	},
	disabledDates(){
		// TODO: might also need to be computed
		return this.$store.getters.disabledDates
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
