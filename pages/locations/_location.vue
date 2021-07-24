<template>
<main>
  <section v-if="location" class="w-full max-w-5xl mx-auto">
    <locations />
    
    <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <div class="text-lg max-w-prose mx-auto">
        <h1>
          <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">{{ location.title }}</span>
        </h1>
      </div>
        <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        <nuxt-content :document="location" />
      </div>
      </div>
      <div>
      <calendar/>
      <div class="flex flex-col">
        <moments class="my-5"/> 
        <session-bookings/>
      </div>
      
    
      <!-- TODO: Create button component -->
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      :class="{'opacity-50': !canSendBookingToDatabase}" :disabled="!canSendBookingToDatabase" @click="createBooking
      ">
        Maak boeking
      </button>
    </div>
    </div>
  </section>
</main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
async asyncData({ $content, params, error }) {
  const location = await $content(`locations/${params.location}`).fetch()
  return {
    location,
  };
},
computed: {
  canAddBookingToSession(){
    return this.$store.getters.canAddBookingToSession
  },
  canSendBookingToDatabase(){
    return this.$store.getters.canSendBookingToDatabase
  },
},
methods: {
  ...mapActions(['setLocation', 'setActiveDate', 'addBookingToSelection', 'createBooking']),
},
mounted(){

  
  this.setLocation(this.location.idInSheet)
  }
};
</script>
