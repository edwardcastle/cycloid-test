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
    <header>
      <h1>Lists of fruits</h1>
      <button class="primary medium">Add fruit</button>
    </header>
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
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.item {
  display: grid;
  grid-template-columns: 1fr;
  cursor: pointer;
  gap: 50px;
  margin-top: 50px;

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
