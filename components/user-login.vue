<template>
<div>
	<client-only>
	  <div class="flex justify-center mt-10">
		<template v-if="user">
		  <a
			href="#"
			class="button button--primary lg:w-1/2"
			@click.prevent="onLogout"
		  >
			Logout
		  </a>
		</template>
		<template v-else>
		  <a
			href="#"
			class="button button--primary mr-2 lg:w-1/2 lg:ml-10"
			@click.prevent="openLogin"
		  >
			Login
		  </a>
		  <a
			href="#"
			class="button button--primary lg:w-1/2 lg:mr-10"
			@click.prevent="openSignup"
		  >
			Sign up
		  </a>
		</template>
	  </div>
	</client-only>
</div>
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