<template>
 <span>{{ translation}}</span>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	props: {
		id: Number
	},
	computed: {
		translation() {
			
		if(this.$store.state.translations == null) return
		return this.$store.state.translations[this.id][this.$store.state.lang]
		}
	}
}
</script>

