<template>
	<div class="prose prose-indigo prose-lg text-gray-500 mx-auto">
		<nuxt-content :document="content" class="prose prose-indigo prose-lg text-gray-500 mx-auto" />
	</div>
</template>

<script>
export default {
	props: {
		content: Object
	}
}
</script>
