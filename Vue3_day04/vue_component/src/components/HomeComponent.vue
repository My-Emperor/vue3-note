<template>
  <h2>this is HomeComponent</h2>
  <h3>Inject get Data: {{name}} -- {{age}} -- {{length.value}}</h3>
</template>

<script>
export default {
  name: "HomeComponent",
  inject:["name","age","length"]
}
</script>

<style scoped>

</style>