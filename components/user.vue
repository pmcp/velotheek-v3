<template>
	<div class="flex items-center">
		<client-only>
				<template v-if="user">
					<button class="underline text-gray-600 hover:text-gray-900" @click.prevent="onLogout">
						Log out
					</button>
				</template>
				<template v-else>
					<button @click="openLogin">
						<span class="underline text-gray-600 hover:text-gray-900">Log In</span>
					</button>
					<!-- <button class="btn block " @click.prevent="openSignup">
						Sign up
					</button> -->
				</template>
			
		</client-only>
		
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
	  computed: {
		...mapGetters({
		  user: 'auth/user'
		}),
		bookingsRoute(){
			return this.$router.path != '/bookings'
		}
	  },
	  methods: {
		onLogout() {
		  this.logout()
		  if (this.$router.path !== '/') {
			this.$router.push('/')
		  }
		},
		...mapActions({
		  openLogin: 'auth/openLogin',
		  openSignup: 'auth/openSignup',
		  logout: 'auth/logout'
		})
	  }
	}
	</script>