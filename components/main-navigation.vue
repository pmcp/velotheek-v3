<template>	
	<div class="flex justify-center flex-row items-center">
		<!-- TODO: Problems with hydration, so made it client only. Makes no sense. -->
		<ClientOnly>

		<nuxt-link to="/locations">
			<translation :id="6" class="underline hover:text-blue-500 mr-5" />
		</nuxt-link>
		
		<!-- HINT: If you put a v-if on a nuxt-link, it breaks hydration -->
		<template v-if="user">
			<nuxt-link  to="/bookings">
				<translation :id="7" class="underline hover:text-blue-500 mr-5" />
			</nuxt-link>
		</template>
		</ClientOnly>
	
	</div>
</template>

<script>
	import { mapGetters  } from 'vuex'
	export default {
	  computed: {
		...mapGetters({
		  user: 'auth/user'
		})
	  }
	}
	</script>