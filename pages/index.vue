<template>
  <div>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log('here')
    const path = '/homepage.' + this.$store.state.lang
    console.log('path', path)
    this.$router.push(path)
  }
}
</script>