<template>
	<div class=" h-full w-full rounded "  id="map"></div>
</template>

<script>
export default {
  computed: {
	  locations(){
		  return this.$store.getters.localisedLocations
	  },
	  activeLocationId(){
		  return this.$store.state.activeLocationId
	  }
  },
  mounted() {
  	// TODO: add all markers

	const mapboxgl = require('mapbox-gl')
	console.log('active location:', this.activeLocationId)
	if(this.activeLocationId != null) {
		console.log(this.locations)
		const activeLocationObject = this.locations.filter(l => l.idInSheet === this.activeLocationId)[0]
		console.log(activeLocationObject)
		const coordinates = JSON.parse(activeLocationObject.location).coordinates
	
		const map = new mapboxgl.Map({
		  accessToken: 'pk.eyJ1IjoicG1jcCIsImEiOiJja3JmMWY4emswdDloMnBvZXhsbTh4OXBrIn0.xOUAdPFdzCU9sSsBbsE-7g',
		  container: 'map',
		  style: 'mapbox://styles/mapbox/streets-v9',
		  center: coordinates,
		  zoom: 13
		})
	
		new mapboxgl.Marker()
		  .setLngLat(coordinates)
		  // .setPopup(loc.description)
		  .addTo(map) // Initialized above	
	} else {
		const coordinates = JSON.parse(this.locations[0].location).coordinates
	
		const map = new mapboxgl.Map({
		  accessToken: 'pk.eyJ1IjoicG1jcCIsImEiOiJja3JmMWY4emswdDloMnBvZXhsbTh4OXBrIn0.xOUAdPFdzCU9sSsBbsE-7g',
		  container: 'map',
		  style: 'mapbox://styles/mapbox/streets-v9',
		  center: coordinates, // starting position as [lng, lat]
		  zoom: 13
		})
		
		
		for (let i = 0; i < this.locations.length; i++) {
			const loc = this.locations[i]
			if(loc) {
				const coordinates = JSON.parse(loc.location).coordinates
				new mapboxgl.Marker()
				  .setLngLat(coordinates)
				  // .setPopup(loc.description)
				  .addTo(map) // Initialized above	
			}
			
		}
	
		  
	
	
	}
	
	
  }
};</script>
