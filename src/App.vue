<script setup></script>

<template>
  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
.container {
  min-height: 100vh;
  padding: 10px 10px;
  @media screen and (min-width: 520px) {
    padding: 25px 25px;
  }

  @media screen and (min-width: 780px) {
    padding: 50px 50px;
  }

  @media screen and (min-width: 1280px) {
    padding: 75px 75px;
  }
}
</style>
