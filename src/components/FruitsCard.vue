<script setup>
// Vue
import { ref } from 'vue'
// Store
import { useFruits } from '@/stores/fruits.js'
// Components
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import DeleteConfirmationProduct from '@/components/DeleteConfirmationProduct.vue'
// Composables
import { useToast } from '@/composables/toast.js'

defineProps({
  fruits: {
    type: Object,
    required: true,
    default: () => {},
  },
  showIcon: {
    type: Boolean,
    required: true,
    default: true,
  },
})

const showDeleteModal = ref(false)

const store = useFruits()
const { showToast } = useToast()

const deleteFruit = id => {
  store.deleteFruit(id)
  showDeleteModal.value = false
  showToast('Fruit deleted')
}
</script>

<template>
  <section v-if="fruits.id" class="fruit">

    <DeleteConfirmationProduct
      :show="showDeleteModal"
      :name="fruits.name"
      @remove="deleteFruit(fruits.id)"
      @close="showDeleteModal = false"
    />

    <RouterLink :to="{ name: 'fruit-detail', params: { id: fruits.id } }">
      <!-- image -->
      <img class="fruit__image" :src="fruits?.image" :alt="fruits.name" />

      <!-- name/taste/price -->
      <div class="fruit__content">
        <div class="name">
          <a class="color" :style="{ backgroundColor: fruits.color }" />
          <p>{{ fruits.name }} ({{ fruits.taste }})</p>
        </div>
        <p>${{ fruits.price }}</p>
      </div>

      <!-- description -->
      <div class="fruit__description">
        <p>{{ fruits.description }}</p>
      </div>
    </RouterLink>

    <!-- expires -->
    <div class="expires">
      <small
        >Expires: {{ new Date(fruits.expires).toLocaleDateString('es') }}
      </small>

      <DeleteIcon
        v-if="showIcon"
        class="delete-icon"
        @click="showDeleteModal = true"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.fruit {
  &__image {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: contain;
    border-radius: 13px;
    border: solid #ededed 1pt;
  }

  &__content {
    display: flex;
    justify-content: space-between;

    .name {
      display: flex;
      align-items: center;
      column-gap: 10px;
      text-transform: capitalize;
    }

    .color {
      width: 20px;
      height: 20px;
      border-radius: 10px;
    }
  }

  &__description {
    width: 100%;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }

  .expires {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .delete-icon {
    z-index: 1;
    width: 45px;
    height: 45px;
  }
}
</style>
