<template>
  <div>
    <LayoutNav />
    <div style="position: absolute; top:56px">
      <nuxt-child />
    </div>
    
    <LayoutFooter />
  </div>
</template>

<script>
export default {
  name: 'basicLayout'
}
</script>

<style>

</style>