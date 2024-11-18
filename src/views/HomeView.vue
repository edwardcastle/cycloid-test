<script setup>
// Vue
import { onMounted } from 'vue'
// Store
import { useFruits } from '@/stores/fruits.js'
// Components
import FruitsCard from '@/components/FruitsCard.vue'
import LoadingIcon from '@/components/icons/LoadingIcon.vue'

const store = useFruits()
onMounted(async () => await store.getFruits())
</script>

<template>
  <main>
    <h1>Lists of fruits</h1>
    <div v-if="!store.loading" class="item">
      <FruitsCard
        v-for="fruit in store.fruits"
        :key="fruit?.id"
        :fruits="fruit"
        :show-icon="true"
      />
    </div>
    <LoadingIcon v-else />
  </main>
</template>

<style lang="scss" scoped>
.item {
  display: grid;
  grid-template-columns: 1fr;
  cursor: pointer;
  gap: 50px;

  @media screen and (min-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 780px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
