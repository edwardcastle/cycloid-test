<template>
  <div id="toast">
    <div class="toast-content">
      <p></p>
    </div>
  </div>
</template>

<style scoped lang="scss">
#toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  color: #ffffff;
  background-color: #000000;
  border-radius: 5px;
  opacity: 0;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.5s ease-in-out;
}

#toast.show {
  opacity: 0.7;
  z-index: 99;
}
</style>
