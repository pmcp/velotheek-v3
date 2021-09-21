<template>

	<button class="my-2 px-1 w-10 h-10 py-1 px-1 rounded-full bg-pink-100 border-2 text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-pink-100" @click="toggle">
		<span v-if="lang === 'fr'">NL</span>
		<span v-else>FR</span>
	</button>

</template>


<script>
import { mapActions } from 'vuex';
  export default {
	computed: {
	  lang(){
		return this.$store.state.lang
	  },
	},
	methods: {
		toggle(){			
			this.toggleLang()
			const path = this.$route.path.slice(0,-2) + this.lang
			this.$router.push(path)
		},
	   ...mapActions(['toggleLang'])
	},
  }
</script>
