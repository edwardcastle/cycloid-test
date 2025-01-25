<script setup>
// Vue
import { reactive } from 'vue'
// Store
import { useFruits } from '@/stores/fruits.js'
// Composables
import { useToast } from '@/composables/toast.js'

defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const emits = defineEmits(['close'])

const store = useFruits()
const { showToast } = useToast()

let newFruit = reactive({
  isFruit: true,
  name: '',
  image: 'upload-icon.png',
  description: '',
  taste: '',
  color: '#000000',
  price: null,
  expires: new Date().toISOString().slice(0, 10),
})

const onFileChange = event => {
  const file = event.target.files[0]
  if (file) {
    if (!file.type.startsWith('image/')) {
      showToast('Error: Please select an image file.')
      return
    }
    const reader = new FileReader()
    reader.onload = e => {
      newFruit.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const createNewFruit = async () => {
  const requiredFields = ['name', 'description', 'taste', 'price']
  const missingFields = requiredFields.filter(field => !newFruit[field])
  if (newFruit.image === 'upload-icon.png') missingFields.unshift('image')
  if (missingFields.length > 0)
    showToast(`Missing required fields: ${missingFields.join(', ')}`)
  else {
    await store.createFruit(newFruit)
    showToast('Fruit created')
    resetValues()
    emits('close')
  }
}

const resetValues = () => {
  newFruit = {
    isFruit: true,
    name: '',
    image: 'upload-icon.png',
    description: '',
    taste: '',
    color: '#000000',
    price: null,
    expires: new Date().toISOString().slice(0, 10),
  }
}
</script>

<template>
  <div v-if="show" id="modal" class="modal">
    <div class="modal-content">
      <header>
        <span @click="$emit('close')" class="close">&times;</span>
        <h1>Create new Fruit</h1>
      </header>
      <div class="form">
        <!-- fruit photo -->
        <div class="uploader">
          <label for="fileInput">
            <input
              @input="onFileChange"
              type="file"
              id="fileInput"
              style="display: none"
            />
            <span>
              <img :src="`${newFruit.image}`" alt="" />
            </span>
          </label>
        </div>
        <h4 style="text-align: center">Select a fruit photo</h4>

        <div class="form-info">
          <!-- color -->
          <div class="color">
            <label for="color">Color:</label>
            <input
              v-model="newFruit.color"
              id="name"
              type="color"
              placeholder=""
            />
          </div>

          <div class="flex-space-between">
            <!-- name -->
            <label for="name">Name: </label>
            <input
              v-model="newFruit.name"
              id="name"
              type="text"
              placeholder="banana"
            />
            <!-- price -->
            <label for="price">Price</label>
            <input
              v-model="newFruit.price"
              id="price"
              step="0.01"
              type="number"
              placeholder="0.64"
            />
          </div>

          <div class="flex-space-between">
            <!-- Taste -->
            <label for="taste">Taste:</label>
            <input
              v-model="newFruit.taste"
              id="taste"
              type="text"
              placeholder="delicious"
            />
            <!-- Expires -->
            <label for="expires">Exp:</label>
            <input v-model="newFruit.expires" type="date" />
          </div>

          <!-- Description -->
          <label for="description">Description</label>
          <textarea
            v-model="newFruit.description"
            id="description"
            type="text"
            placeholder=""
          />
        </div>
      </div>

      <!-- actions buttons -->
      <div class="actions">
        <button @click="$emit('close')" class="secondary">cancel</button>
        <button @click="createNewFruit" class="primary">create</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form {
  .uploader {
    aspect-ratio: 6;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &-info {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    row-gap: 20px;
    margin-right: 6px;

    .color {
      align-items: center;
      display: flex;
      gap: 10px;
    }

    .flex-space-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 10px;
    }
  }
}
</style>
