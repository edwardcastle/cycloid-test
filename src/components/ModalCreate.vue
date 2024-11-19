<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
})

defineEmits(['close', 'create'])
</script>

<template>
  <div v-if="show" id="modal" class="modal">
    <div class="modal-content">
      <span @click="$emit('close')" class="close">&times;</span>
      <div class="form">
        <!-- fruit photo -->
        <div class="uploader">
          <label for="fileInput">
            <input type="file" id="fileInput" style="display: none" />
            <span>
              <img src="../assets/upload-icon.png" alt="" />
            </span>
          </label>
        </div>
        <h4 style="text-align: center">Select a fruit photo</h4>

        <div class="form-info">
          <input id="name" type="color" placeholder="" />
          <div class="flex-space-between">
            <label for="name">Name: </label>
            <input id="name" type="text" placeholder="banana" />
            <label for="price">Price</label>
            <input id="price" step="0.01" type="number" placeholder="0.64" />
          </div>

          <div class="flex-space-between">
            <label for="taste">Taste:</label>
            <input id="taste" type="text" placeholder="delicious" />
            <label for="expires">Exp:</label>
            <input type="date" />
          </div>

          <label for="description">Description</label>
          <textarea id="description" type="text" placeholder="" />
        </div>
      </div>
      <div class="actions">
        <button @click="$emit('close')" class="secondary">cancel</button>
        <button @click="$emit('create')" class="primary">delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form {
  .uploader {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }

  img {
    opacity: 0.5;
    width: 150px;
    height: 150px;
  }

  &-info {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    row-gap: 20px;
    margin-right: 6px;

    .flex-space-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 10px;
    }
  }
}
</style>
