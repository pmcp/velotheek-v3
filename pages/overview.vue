<template>
	  <main class="flex flex-col mt-5">

		  <h1 class="text-xl py-5"><translation :id="5"/></h1>
		<client-only>

		<bookings-all :bookings="bookingsByDate"/>
	  </client-only>    
	
	  </main>

	</template>
	
	<script>
	import { mapActions } from 'vuex';
	// TODO: Importing vue here for the filter, don't know if this is good practice
	import Vue from 'vue'
	export default {
	  computed: {
		bookingsByDate(){
		  if(this.$store.state.bookings.length == 0) return []
		  return Vue.filter('orderBy')(this.$store.state.bookings, 'date');
		}	
	  },
	methods: {
	  ...mapActions(['getLocations', 'getTranslations', 'getBookings' ]),
	},  
	mounted(){
	  if (process.client) {
		this.getLocations()
		this.getTranslations()  
		this.getBookings()  
	  }
	  
	  
	  
	  
	},
	  // middleware: 'auth'
	};</script>
	
	