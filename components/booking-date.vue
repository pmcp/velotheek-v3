<template>
	<div class="flex flex-col items-center">
		<div class="text-xs md:text-xl font-bold ">
			{{ date | formatDate('d', lang) }} / {{ date | formatDate('MM', lang) }} 
			</div>	
		<div class="text-xs md:text-sm font-medium">{{ date | formatDate('EEEE', lang) }}</div>
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
	