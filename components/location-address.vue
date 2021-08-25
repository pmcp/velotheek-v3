<template>
<div>
	<p v-if="loc" class="text-sm text-gray-500">

		<span v-if="loc.title" class="font-sm font-semibold">{{loc.title}}</span>
		  <span class="block">{{ loc.street }}</span>
		  <span class="block">{{loc.zip}} {{ loc.city}}</span>
		</p>
	  </div>
	
	</template>
	
	<script>
	
	export default {
	props: {
		  location: String
	  },
	  computed: {
		  locations() {
			  return this.$store.getters.localisedLocations
		  },
		  loc(){
			  const filteredLocations = this.locations.filter(l => this.location == l.idInSheet)
			  return filteredLocations[0]
		  }
	  }

	}
	</script>
	