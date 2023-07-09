<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',

  created() {
    if (this.$router.currentRoute.path === '/') {
      this.$router.push('/trending');
    }
  },
};
</script>
