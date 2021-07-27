<template>
  <main class="grid grid-rows-2 gap-8">
    
    <locations  class="my-5"/>
    <div>
      <h1 class="text-lg">
        Velotheek
        </h1>
        <content-wrapper :content="content" />
        </div>
    

  </main>
</template>

<script>

export default {
  // TODO: Check all heads
  head: {
    link: [{
      rel: 'stylesheet',
      href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css',
    }, ],
    },
    
async asyncData({ $content, params, error }) {
  const content = await $content(`pages/homepage.nl`).fetch()
  
  return {
    content
  }
  }
}
</script>

