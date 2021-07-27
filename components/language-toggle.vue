<template>

	<button class="w-14 h-14 py-2 px-1  h-full rounded-full hover:border-blue-500 w-full border-2" @click="toggle">
		<span v-if="lang === 'fr'" >NL</span>
		<span v-if="lang === 'nl'" >FR</span>
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
			console.log(path)
			this.$router.push(path)
			

		  
			
		},
	   ...mapActions(['toggleLang'])
	}
  }
</script>
