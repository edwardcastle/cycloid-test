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
