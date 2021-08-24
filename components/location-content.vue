<template>
<section class="px-6 pt-4">
	  <h1>
		<span class=" block text-xl font-semibold mx-auto ">{{ content.title }}</span>
	  </h1>
	
	  <div class="mt-6">
		<content-wrapper :content="content" />
      <content-wrapper :content="content" />
      <content-wrapper :content="content" />
      <content-wrapper :content="content" />
      <content-wrapper :content="content" />
      <content-wrapper :content="content" />
	  </div>
	</section>
</template>

<script>
	export default {
		props:{
			content: Object
		}
	}
</script>

<style scoped>

</style>