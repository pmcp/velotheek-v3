<template>
<div>
<button  v-if="lang === 'nl'" class="btn block " @click="toggle">
FR
</button>
<button  v-else class="btn block " @click="toggle">
NL
</button>
</div>
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
