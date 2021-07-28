<template>
	<div >
		<card position="bottom" class="w-full h-full" open open-text="Close" close-text="Open" open-class="" close-class="">
			  <template v-slot:opened >
				  <chart-line :bookings="bookings" />
				  <ul  class="divide-y divide-gray-200">
					  <li v-for="(b, key) in bookings" :key="`${key}-bookings`">
		  
						  <!-- TODO: Make component (cos also in session page -->
						<div class="hover:bg-gray-50">
						  <div class="flex items-center items-stretch">
							  
						   <div class="p-8 bg-blue-100 w-40 flex items-center "><booking-date :date="new Date(b.date)"/></div>
							<div class="flex-1 flex px-4 py-4 sm:px-6">
								<div>
								  
								  <div class="mt-2 flex text-sm text-gray-500">
									  
									  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2"  style="margin-top:.1rem"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
										  </svg>
										  
										  <p class="text-sm text-gray-500">
											  
											  <span class="font-sm font-semibold">{{ moments[b.moment].name[lang] }}</span>
											  <span class="block">{{ moments[b.moment].descr[lang] }}</span>
											  </p>
									
								  </div>
								  
								  
								  <div class="mt-2 flex  text-sm text-gray-500">
									  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" style="margin-top:.1rem" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										  </svg>
										  <location-address :location="b.location"/>
									  <!-- Look up location based on id.	 -->
									  
									  
									  
								  </div>
								</div>	  
							</div>
							<div class="group flex items-center px-4 py-4 sm:px-6">
								
							  <button @click="removeFromBookingDb(b.rowId)" class=" rounded-full p-3 border-2 border-grey group-hover:bg-red-100 group-hover:border-red-100"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								  </svg></button>
							</div>
						  </div>
						</div>
					  </li>
					</ul>
			  </template>
			  
			</card>
	</div>
</template>	
	
	<script>
		import { mapActions } from 'vuex';
		export default {
			props: {
				  bookings: {
					  type: Array,
					  default: []
				  }
			  },
			computed: {
				moments() {
					return this.$store.getters.moments
				},
				lang() {
					return this.$store.state.lang
				},
				date() {
					return this.$store.getters.date
				},

		
			},
			methods: {
				 ...mapActions(['removeFromBookingDb'])
			}
			
		}
		</script>
		
		