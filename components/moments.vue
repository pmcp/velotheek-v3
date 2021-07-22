<template>
	<div>
		<div
		<div class="bg-white shadow overflow-hidden sm:rounded-md">
		  <ul class="divide-y divide-gray-200">
			  {{ activeMoment }}
			<li v-for="(l, key) in moments" :key="`${key}-sessionBookings`">
				
			  <div class="block hover:bg-gray-50">
				<div class="flex items-center px-4 py-4 sm:px-6">
				  <div class="min-w-0 flex-1 flex items-center">
					
					<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
					  <div>
						<p class="text-sm font-medium text-indigo-600 truncate">Moment: {{ l.name }}</p>
					
					  </div>	  
					</div>
				  </div>
				  <div>
					<!-- Heroicon name: solid/chevron-right -->
					<button @click="selectMoment(key)">Select</button>
				  </div>
				</div>
			  </div>
			</li>
		  </ul>
		</div>	
	</div>
	
</template>


<script>
import { mapActions } from 'vuex';
	export default {
		computed: {
			moments(){
			  return this.$store.state.moments
			},
			activeMoment (){
				  return this.$store.state.activeMoment
				},
		},
		methods: {
			 ...mapActions(['selectMoment'])
		}
	}
</script>
