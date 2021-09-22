<template>
  <section class="pb-8 pt-2">
    <heading-one>
      {{ content.title }}
    </heading-one>
    <div class="mt-2  md:mt-6">
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
