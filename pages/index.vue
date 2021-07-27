<template>
  <main class="flex flex-col">
    
    <locations />
    
    <card position="bottom" open padding open-text="Close" close-text="Open" open-class="" close-class="" >
      <template v-slot:opened>
        <content-wrapper :content="content" />
      </template>
      <template v-slot:closed>
        
      </template>
    </card>
    

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

