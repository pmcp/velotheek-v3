<template>
	<div >
		<card position="bottom" class="w-full h-full" open open-text="Close" close-text="Open" open-class="" close-class="">
			  <template v-slot:opened >
			  </template>
			  <template v-slot:closed>
			  </template>
			</card>
	</div>
</template>	
	
	<script>
	
	
	export default {
		
	props: {
		  date: Date
	  },
	  
	  computed: {
		  lang(){
				return this.$store.state.lang
		  },
	  }
	}
	</script>
	