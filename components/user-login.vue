<template>
		<client-only>
			<div class="flex">
				<template v-if="user">
					<button class="btn block " @click.prevent="onLogout">
						Log out
					</button>
				</template>
				<template v-else>
					<button class="btn block " @click.prevent="openLogin">
						Log In
					</button>
					<button class="btn block " @click.prevent="openSignup">
						Sign up
					</button>
				</template>
			</div>
		</client-only>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
	  computed: {
		...mapGetters({
		  user: 'auth/user'
		})
	  },
	  methods: {
		onLogout() {
		  this.logout()
		  if (this.$route.path !== '/') {
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