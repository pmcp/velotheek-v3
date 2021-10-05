<template>
  <!-- TODO: Disable when not logged in -->
  <client-only>
	  <v-date-picker
    :locale="lang"
		:value="activeDate"
		@input="setActiveDate($event)"
		:disabled-dates="disabledDates"
    is-expanded
		:attributes="calAttributes"
		:min-date="new Date()"
    color="gray"
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
  lang(){
    return this.$store.state.lang
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
