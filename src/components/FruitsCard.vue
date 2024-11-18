<script setup>
defineProps({
  fruits: {
    type: Object,
    required: true,
    default: () => {},
  },
})
</script>

<template>
  <section v-if="fruits.id" class="fruit">
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

      <!-- expires -->
      <small
        >Expires: {{ new Date(fruits.expires).toLocaleDateString('es') }}</small
      >
    </RouterLink>
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
    height: 75px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }

  small {
    display: flex;
    justify-content: end;
  }
}
</style>
