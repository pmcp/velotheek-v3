<template>
  <main>
      <h1 class="title">Locations</h1>
      <locations />
    
  </main>
</template>

<script>
export default {
   async asyncData({ $content }) {
    const locations = await $content("locations").fetch();

    return {
      locations,
    };
  },
};
</script>

