<script setup>
import { onMounted } from 'vue'
import { useFruits } from '@/stores/fruits.js'

const store = useFruits();
onMounted(async () => await store.getFruits())
</script>

<template>
  <main>
    {{ store.fruits }}
  </main>
</template>
