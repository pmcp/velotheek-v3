<template>
	<div>
		<div <div class="bg-white shadow overflow-hidden sm:rounded-md">
			<ul class="divide-y divide-gray-200 relative">
				<div v-if="activeDate == null" class="absolute p-8 top-0 left-0 h-full w-full bg-white flex items-center opacity-80">
					<div class="w-full text-center italic">
					Selecteer eerst een dag
					</div>
				</div>
				
				<li >
					<div class="px-4 py-4 sm:px-6">
						<h3 class="text-lg leading-6 font-medium text-gray-900">
							Momenten
						  </h3>
						  <p class="mt-1 text-sm text-gray-500">
							Kies het moment waarop je fietsen wil reserveren
						  </p>
					</div>
						
					</li>
				<li v-for="(l, key) in moments"   :key="`${key}-sessionBookings`">
					<div v-if="key == 2" class="w-full hover:bg-gray-50 flex  px-4 py-4 sm:px-6" :class="{'opacity-50': (!moments[0].available || !moments[1].available)}">
						<div class="flex-1 flex">
							<div class="flex flex-col">
					
						<p class="text-sm font-medium text-indigo-600 ">{{ l.name[lang] }}</p>
						<p class="mt-1 text-sm text-gray-500 italic">
							{{ l.descr[lang] }}
						  </p>
							</div>
						</div>
						<div class="group">
						<button @click="selectMoment(key)" :disabled="((activeDate == null) || !moments[0].available || !moments[1].available)" class=" rounded-full p-3 border-2 border-grey group-hover:bg-green-100 group-hover:border-green-100">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>

						</button>
						</div>
					</div>
					
					<div v-else class="w-full hover:bg-gray-50 flex px-4 py-4 sm:px-6"  :class="{'opacity-50': !l.available}">
						<div class="flex-1 flex">
							<div class="flex flex-col">
								<p class="text-sm font-medium text-indigo-600 ">{{ l.name[lang] }}</p>
								<p class="mt-1 text-sm text-gray-500 italic">
									{{ l.descr[lang] }}
								  </p>
									</div>
							</div>
					
								<div class="group">
							
								<button @click="selectMoment(key)" :disabled="(activeDate == null) || !l.available " class=" rounded-full p-3 border-2 border-grey group-hover:bg-green-100 group-hover:border-green-100">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
										</svg>
								</button>
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
			  return this.$store.getters.moments
			},
			lang(){
				  return this.$store.state.lang
			},
			activeMoment (){
				  return this.$store.state.activeMoment
			},
			activeDate (){
				  return this.$store.state.activeDate
			}
		},
		methods: {
			 ...mapActions(['selectMoment'])
		}
	}
</script>
