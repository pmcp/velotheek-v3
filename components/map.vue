<template>
	<div id="map"></div>
</template>

<script>
export default {
  props: {
  	activeLocationId: String,
	locations: Array
  },
  mounted() {
	  if (process.client) {
  	// TODO: add all markers
	const mapboxgl = require('mapbox-gl')
	const activeLocationObject = this.locations.filter(l => l.idInSheet === this.activeLocationId)
	const loc = activeLocationObject[0]
	
	const coordinates = JSON.parse(loc.location.coordinates)

	const map = new mapboxgl.Map({
	  accessToken: 'pk.eyJ1IjoicG1jcCIsImEiOiJja3JmMWY4emswdDloMnBvZXhsbTh4OXBrIn0.xOUAdPFdzCU9sSsBbsE-7g',
	  container: 'map',
	  style: 'mapbox://styles/mapbox/streets-v9',
	  center: coordinates, // starting position as [lng, lat]
	  zoom: 13
	})


	new mapboxgl.Marker()
	  .setLngLat(coordinates)
	  // .setPopup(loc.description)
	  .addTo(map) // Initialized above

	// Get the location based on the id we are using in the database (google sheet)
	this.setLocation(this.loc.idInSheet)
  }
  }
};</script>
