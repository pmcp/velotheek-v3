<template>
  <section class="py-8">
    <heading-one>
      {{ content.title }}
    </heading-one>
    <div class="mt-6">
      <content-wrapper :content="content" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    content: Object,
  },
}
</script>

<style scoped></style>
