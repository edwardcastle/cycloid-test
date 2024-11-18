<script setup>
defineProps({
  name: {
    type: String,
    default: '',
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
})

defineEmits(['close', 'remove'])
</script>

<template>
  <div v-if="show" id="modal" class="modal">
    <div class="modal-content">
      <span @click="$emit('close')" class="close">&times;</span>
      <h3>
        Are you sure you want to delete <span class="name">{{ name }}</span>
      </h3>
      <div class="actions">
        <button @click="$emit('close')" class="secondary">cancel</button>
        <button @click="$emit('remove')" class="primary">delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  background-color: rgba(168, 168, 168, 0.2);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 30px;
  border-radius: 12px;
  width: 30%;

  .name {
    color: #c80303;
  }

  .actions {
    margin-top: 2rem;
    display: flex;
    justify-content: end;
    column-gap: 10px;
  }
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
