<template>

	<button class="bg-white px-3 w-14 h-14 py-2 px-1 rounded-full hover:border-blue-500 border-2" @click="toggle">
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
	}
  }
</script>
