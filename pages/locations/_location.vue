<template>
  <main class="flex flex-col">

   <locations class="my-5"/>
     <div class="grid grid-cols-3 gap-4 pb-5 relative">
       <location-content class="col-span-2" :content="location"/>
       <section class="absolute -top-20 right-0 z-10 mr-10">
         <card position="bottom" class="w-full h-full" open open-text="Close" close-text="Open" open-class="" close-class=""  >
           <template v-slot:opened >
             <!-- TODO: Remove border of v-calendar -->
             <div class="bg-blue-50">
             <booking-calendar/>
             <booking-moments/>
             </div>
           </template>
         </card>
       </section>
     </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
head: {
link: [{
  rel: 'stylesheet',
  href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css',
}, ],
},
async asyncData({  $content, params, error, payload }) {
  if (payload) {
    return { location: payload }} else {
    const location = await $content("locations", params.location).fetch();
    return {location: location}
  }
},
computed: {
locations() {
  return this.$store.getters.localisedLocations
},
activeLocationId(){
return this.$store.state.activeLocationId
}
},
methods: {
  ...mapActions(['setLocation', 'setActiveDate', 'addBookingToSelection', 'getLocations', 'getTranslations','getBookings' ]),
},
mounted(){
  // if (process.client) {
  //   this.getLocations()
  //   this.getTranslations() 
  //   this.getBookings()   
  // }
  // 
  this.setLocation(this.location.idInSheet)
},
  // middleware: 'auth'
};
</script>

