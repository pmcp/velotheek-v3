<template>
  <div class="">
  <main class="flex flex-col min-h-screen">

   <locations class="my-5"/>
     <div class="flex relative">
       <location-content class="w-3/5" :content="location"/>
       <div class="px-6 w-2/5">
         <div class="sticky top-20">
           <div class="relative">
          <booking-calendar class="z-20 "/>
          <booking-moments class="z-10"/>
           </div>
         </div>
       </div>
     </div>

  </main>
    <div class="sticky bottom-0 w-full z-10" :class="{'hidden': !user }">
      <div class="flex items-center relative w-full">
        <bookings-session />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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

  ...mapGetters({
    user: 'auth/user',
  }),
activeLocationId(){
return this.$store.state.activeLocationId
}
},
methods: {
  ...mapActions(['setLocation', 'setActiveDate', 'addBookingToSelection', 'getLocations', 'getTranslations','getBookings' ]),
},
mounted(){
  this.setLocation(this.location.idInSheet)
},

};
</script>

