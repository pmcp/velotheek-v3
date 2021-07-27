<template>
<div class="relative">
	
	<div class="w-full h-80 " >
		<card position="bottom" class="w-full h-full" open open-text="Close" close-text="Open" open-class="" close-class=""  >
		  <template v-slot:opened >
		  <div class="w-full h-full">
			  <location-map />
		  </div>
		  </template>
		  <template v-slot:closed>
			  CLOSED MAP
			 </template>
	  </card>
	  <div class="absolute top-5 right-10  ml-5">
		  <div class="pl-4 h-14 rounded-full bg-white grid grid-cols-2 gap-4 text-center p-1">
		  <user />
	  	<language-toggle />
		  </div>
	  </div>
		  
<div class="absolute top-0 left-0 w-1/4 h-full ml-5">
	  <div class="mt-5">
<card position="bottom" class="w-full " open open-text="Close" close-text="Open" open-class="" close-class="">
	  <template v-slot:opened >
		  <div class="">
			  
				<ul class="divide-y divide-gray-200 relative">
					
				  <li v-for="(l, key) in locations" :key="`${key}-locations`" class=" p-1">
					  <nuxt-link :to="l.path"> 
					  <div class="rounded px-3 py-2 h-full w-full border-2 " :class="{ 'border-blue-500': (l.idInSheet === activeLocationId) }">
						  <h3 class="">{{ l.title }}</h3>
						  <location-address :location="l.idInSheet"/>
						  </div>
							  
					</nuxt-link>
				  
				  </li>
				</ul>
				
					
				  
				  
			  </div>
			  
			  
	  </template>
	  <template v-slot:closed>
	  </template>
	</card>	
	  </div>
				  
	</div></div>
	

</div>

	

</template>


<script>
	export default {
		computed: {
			locations(){
			  return this.$store.getters.localisedLocations
			},
			activeLocationId(){
				  return this.$store.state.activeLocationId
				},

		}
	}
</script>
