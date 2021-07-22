<template>
	<div>
		<div
		<div class="bg-white shadow overflow-hidden sm:rounded-md">
		  <ul class="divide-y divide-gray-200">
			  
			<li v-for="(l, key) in moments" :key="`${key}-sessionBookings`">
				
			  <button  v-if="key == 2" class="w-full hover:bg-gray-50 " @click="selectMoment(key)" :disabled="((activeDate == null) || !moments[0].available || !moments[1].available)" :class="{'opacity-50': (!moments[0].available || !moments[1].available)}">
				<div class="flex items-center px-4 py-4 sm:px-6 border-4 border-white" :class="{ 'border-indigo-600': activeMoment === key}">
				  <p class="w-full text-center text-sm font-medium text-indigo-600 truncate">{{ l.name[lang] }}</p>
				</div>
			  </button>
			  <button  v-else class="w-full hover:bg-gray-50 " @click="selectMoment(key)" :disabled="(activeDate == null) || !l.available " :class="{'opacity-50': !l.available}">
				  <div class="flex items-center px-4 py-4 sm:px-6 border-4 border-white" :class="{ 'border-indigo-600': activeMoment === key}">
					<p class="w-full text-center text-sm font-medium text-indigo-600 truncate">{{ l.name[lang] }}</p>
				  </div>
				</button>
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
			},
		},
		methods: {
			 ...mapActions(['selectMoment'])
		}
	}
</script>
