export function useToast() {
  const showToast = (message) => {
    const toast = document.getElementById('toast')
    toast.querySelector('p').textContent = message
    toast.classList.add('show')
    setTimeout(() => {
      toast.classList.remove('show')
    }, 3000)
  }
  return { showToast }
}
