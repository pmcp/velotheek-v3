<template>
	<div>
		??
		{{ sessionBookings}}
	</div>
</template>

<script>
	export default {
		
		computed: {
			sessionBookings(){
			  return this.$store.state.sessionBookings
			},
		},
	}
</script>

