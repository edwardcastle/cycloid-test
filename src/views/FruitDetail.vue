<script setup>
// Vue
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { useFruits } from '@/stores/fruits.js'
// Components
import FruitsCard from '@/components/FruitsCard.vue'
import LoadingIcon from '@/components/icons/LoadingIcon.vue'

const route = useRoute()
const store = useFruits()

const fruit = computed(() => store.currentFruit)
onMounted(async () => await store.getFruitById(route.params.id))
</script>

<template>
  <main>
    <h1>Fruit detail</h1>
    <div class="content">
      <FruitsCard
        class="fruit-detail"
        v-if="fruit && !store.loading"
        :fruits="fruit"
        :show-icon="false"
      />
      <LoadingIcon v-if="store.loading" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: center;
}

.fruit-detail {
  max-width: 450px;
}
</style>
