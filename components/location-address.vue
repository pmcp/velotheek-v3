<template>
<div>
	<p class="text-sm text-gray-500">
		<span class="font-sm font-semibold">{{location.title}}</span>
		
		  <span class="block">{{ location.street }}</span>
		  <span class="block">{{location.zip}} {{ location.city}}</span>
		</p>
	  </div>
	
	</template>
	
	<script>
	import { mapActions } from 'vuex';
	export default {
	props: {
		  location: Object
	  }
	
	}
	</script>
	