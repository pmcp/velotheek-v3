<template>
<div>
	<p v-if="loc" class="text-center md:text-left w-full">
		<span v-if="loc.title" class=" font-sm font-semibold">{{loc.title}}</span>
		  <span class="block hidden md:block">{{ loc.street }}</span>
		  <span class="block hidden md:block">{{loc.zip}} {{ loc.city}}</span>
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
	