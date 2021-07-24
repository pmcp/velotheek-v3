<template>
	<div
		<div class="bg-white shadow overflow-hidden sm:rounded-md">
			<div v-if="sessionBookings.length == 0 " class="flex items-center">
				<div class="w-full text-center p-4 text-gray-500 italic">
					No reservations yet
				</div>
				
			</div>
			  <ul v-else class="divide-y divide-gray-200">
	
				<li v-for="(b, key) in sessionBookings" :key="`${key}-sessionBookings`">
	
				  <a href="#" class="block hover:bg-gray-50">
					<div class="flex items-center px-4 py-4 sm:px-6">
					  <div class="flex-1 flex items-center">
						  <div>
							<p class="text-sm font-medium text-indigo-600 truncate">{{ date.name }} {{ date.long }}</p>
							<p class="mt-2 flex items-center text-sm text-gray-500">
								
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
							  {{ moments[b.moment].name[lang] }}
							</p>
							<div class="mt-2 flex items-center text-sm text-gray-500">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
									
								<!-- Look up location based on id.	 -->
								<div class="flex">
									<div>{{ getLocationById(b.location).title}}</div>
									<div>{{ getLocationById(b.location).street}}</div>
									<div>{{ getLocationById(b.location).zip}}, {{ getLocationById(b.location).city}}</div>
								</div>
								
							</div>
						  </div>	  
					  </div>
					  <div class="group">
						
						<button @click="removeFromBookingsSelection({key, booking: b})" class=" rounded-full p-3 border-2 border-grey group-hover:bg-red-100 group-hover:border-red-100"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg></button>
					  </div>
					</div>
				  </a>
				</li>
			  </ul>
		</div>	
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	computed: {
		sessionBookings() {
			return this.$store.state.sessionBookings
		},
		moments() {
			return this.$store.getters.moments
		},
		lang() {
			return this.$store.state.lang
		},
		locations() {
			return this.$store.state.locations
		},
		date() {
			return this.$store.getters.date
		},
	},
	methods: {
		getLocationById(id) {
			const filteredLocations = this.locations[this.lang].filter(l => l.idInSheet == id)
			return filteredLocations[0]
		},
		...mapActions(['removeFromBookingsSelection']),
	},
}
</script>

