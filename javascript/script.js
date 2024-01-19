const login = document.querySelector(".login-button")
const modal = document.querySelector(".modal")
const closeModal = document.querySelector(".close")
const form = document.querySelector(".form")
const overlay = document.querySelector(".overlay")


login.addEventListener("click", () => {
  modal.style.display = "flex"
  overlay.style.display = "flex"
  modal.show();
})
closeModal.addEventListener("click", () => {
  modal.style.display = "none"
  overlay.style.display = "none"
  modal.close();
})

