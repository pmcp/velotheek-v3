<template>
	<div class="flex justify-center flex-row items-center">
	

			<nuxt-link to="/locations">
				<translation :id="6" class="underline hover:text-blue-500 mr-5"/>
			</nuxt-link>
			
			<nuxt-link v-if="user" to="/bookings">
				<translation :id="7" class="underline hover:text-blue-500 mr-5"/>
			</nuxt-link>

		
			
		
		
		
	</div>
</template>

<script>
	import { mapGetters  } from 'vuex'
	export default {
	  computed: {
		...mapGetters({
		  user: 'auth/user'
		}),
		// bookingsRoute(){
		// 	return this.$router.path == '/bookings'
		// }
	  },
	  mounted(){console.log('here')}
	}
	</script>