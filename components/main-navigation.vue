<template>	
	<div class="flex justify-center flex-row items-center">
		<!-- TODO: Problems with hydration, so made it client only. Makes no sense. -->
		<ClientOnly>

    <template v-if="user">
		<nuxt-link :to="`/locations/4saisons.${lang}`">
			<translation :id="6" class="underline hover:text-blue-500 mr-5" />
		</nuxt-link>
    </template>
		<!-- HINT: If you put a v-if on a nuxt-link, it breaks hydration -->

		<template v-if="user">
			<nuxt-link  :to="`/bookings.${lang}`" class="mr-5 underline hover:text-blue-500">
				<translation :id="7" /> ({{userBookings}})
			</nuxt-link>
		</template>
		</ClientOnly>
	
	</div>
</template>

<script>
	import { mapGetters  } from 'vuex'
  import Vue from 'vue'
	export default {

	  computed: {
      lang(){
        return this.$store.state.lang
      },
      userBookings(){
        if(this.$store.getters.userBookings)
          return this.$store.getters.userBookings.length
      },
		...mapGetters({
		  user: 'auth/user'
		})
	  }
	}
	</script>