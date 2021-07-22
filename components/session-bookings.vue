<template>
	<div
		<div class="bg-white shadow overflow-hidden sm:rounded-md">
		  <ul class="divide-y divide-gray-200">

			<li v-for="(b, key) in sessionBookings" :key="`${key}-sessionBookings`">

			  <a href="#" class="block hover:bg-gray-50">
				<div class="flex items-center px-4 py-4 sm:px-6">
				  <div class="min-w-0 flex-1 flex items-center">
					
					<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
					  <div>
						<p class="text-sm font-medium text-indigo-600 truncate">{{ b.date }}</p>
						<p class="mt-2 flex items-center text-sm text-gray-500">
						  <span class="truncate">{{ moments[b.moment].name[lang] }}</span>
						</p>
						<p class="mt-2 flex items-center text-sm text-gray-500">
							<!-- Look up location based on id.	 -->
						  <span class="truncate">{{ b.location }}</span>
						</p>
					  </div>	  
					</div>
				  </div>
				  <div>
					<!-- Heroicon name: solid/chevron-right -->
					<button @click="removeFromBookingsSelection({key, booking: b})">Remove</button>
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
		sessionBookings(){
		  return this.$store.state.sessionBookings
		},
		moments(){
			  return this.$store.getters.moments
			},
			lang(){
				  return this.$store.state.lang
				},
				locations(){
					  return this.$store.state.locations
					},
	},
	methods: {
		...mapActions(['removeFromBookingsSelection']),
	},
}
</script>

