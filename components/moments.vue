<template>
	<div>
		Moments
		{{ moments }}
		<li v-for="(l, key) of moments" :key="`$key + moments`">
			  {{l}}
			</li>
	</div>
</template>


<script>
	export default {
		computed: {
			moments(){
			  return this.$store.state.moments
			},
		}
	}
</script>
