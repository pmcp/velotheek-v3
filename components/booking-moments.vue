<template>
  <div>

  <custom-transition :id="2">
	<div v-if="activeDate != null" class="bg-gray-50 border border-gray-200 rounded-lg pt-4 w-full relative -top-5">
		<ul class="divide-y divide-gray-200 relative ">
			<li >
				<div class="px-4 py-4 sm:px-6">
					<h3 class="text-lg leading-6 font-medium text-gray-700">
						<translation :id="2"/>
					  </h3>
					  <p class="mt-1 text-sm text-gray-400"><translation :id="1"/></p>
				</div>
			</li>
			
			<li v-for="(l, key) in moments"   :key="`${key}-sessionBookings`">
				<div v-if="key == 2" class="w-full hover:bg-white flex  px-4 py-4 sm:px-6" :class="{'opacity-50': (!moments[0].available || !moments[1].available)}">
					<div class="flex-1 flex">
						<div class="flex flex-col">
				
					<p class="text-sm font-medium text-gray-700">{{ l.name[lang] }}</p>
					<p class="mt-1 text-sm text-gray-400 italic">
						{{ l.descr[lang] }}
					  </p>
						</div>
					</div>
					<div class="group">
					<button @click="selectMoment(key)" :disabled="((activeDate == null) || !moments[0].available || !moments[1].available)" class="rounded-full p-3 border-2 border-bg-gray-400 text-gray-700 group-hover:bg-pink-100 group-hover:border-pink-500 hover:text-pink-500">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>

					</button>
					</div>
				</div>
				
				<div v-else class="w-full hover:bg-white flex px-4 py-4 sm:px-6"  :class="{'opacity-50': !l.available}">
					<div class="flex-1 flex">
						<div class="flex flex-col">
							<p class="text-sm font-medium text-gray-700">{{ l.name[lang] }}</p>
							<p class="mt-1 text-sm text-gray-400 italic">
								{{ l.descr[lang] }}
							  </p>
								</div>
						</div>
				
							<div class="group">
						
							<button @click="selectMoment(key)" :disabled="(activeDate == null) || !l.available " class="rounded-full p-3 border-2 border-bg-gray-400 text-gray-700 group-hover:bg-pink-100 group-hover:border-pink-500 hover:text-pink-500">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
									</svg>
							</button>
							</div>
					
				</div>

			</li>
		</ul>
</div>
  </custom-transition>

	</div>

</template>


<script>
import { mapActions } from 'vuex';
	export default {
		computed: {
			translations(){
			  return this.$store.state.translations
			},
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
