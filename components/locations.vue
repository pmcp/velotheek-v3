<template>
	<div>
		Locations
		<li v-for="l of locations" :key="l.slug">
			  {{ l.title }}	
			</li>
	</div>
</template>


<script>
	export default {
		computed: {
			locations(){
			  return this.$store.state.locations
			},
		}
	}
</script>
