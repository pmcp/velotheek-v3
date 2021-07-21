<template>
  <div>
  <no-ssr>
	  <v-date-picker
  		mode="range"
		:value="activeDate"
		@input="setActiveDate($event)"
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
},
 methods: {
	 ...mapActions({
	   setActiveDate: 'setActiveDate',
	 }),
}
}
</script>