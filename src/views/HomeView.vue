<script setup>
// Vue
import { onMounted, ref } from 'vue'
// Store
import { useFruits } from '@/stores/fruits.js'
// Components
import FruitsCard from '@/components/FruitsCard.vue'
import LoadingIcon from '@/components/icons/LoadingIcon.vue'
import ModalCreate from '@/components/ModalCreate.vue'

const store = useFruits()
const showCreateModal = ref(false)

onMounted(async () => await store.getFruits())
</script>

<template>
  <main>
    <!-- Create fruit modal -->
    <ModalCreate @close="showCreateModal = false" :show="showCreateModal" />

    <!-- Header -->
    <header>
      <h1>Lists of fruits</h1>
      <button class="primary medium" @click="showCreateModal = true">
        Add fruit
      </button>
    </header>

    <!-- Lists of fruits -->
    <div v-if="!store.loading" class="item">
      <FruitsCard
        v-for="fruit in store.fruits"
        :key="fruit?.id"
        :fruits="fruit"
        :show-icon="true"
      />
    </div>

    <!-- Loading icon -->
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
