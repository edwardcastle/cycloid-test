<template>
  <div id="toast">
    <div class="toast-content">
      <p></p>
    </div>
  </div>
</template>

<style scoped lang="scss">
#toast {
  z-index: 99;
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  color: #ffffff;
  background-color: #1dc803;
  border-radius: 5px;
  opacity: 0;
  font-size: 16px;
  font-weight: 600;
  transition: opacity 0.5s ease-in-out;
}

#toast.show {
  opacity: 0.8;
}
</style>
