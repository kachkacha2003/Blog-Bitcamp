const login = document.querySelector(".login-button")
const modal = document.querySelector(".modal")
const closeModal = document.querySelector(".close")
const form = document.querySelector(".form")
const overlay = document.querySelector(".overlay")
const otherLink = document.querySelectorAll(".other-link")
const container = document.querySelector(".info-cards")
const filterBox = document.querySelectorAll(".filter-div")
const allElem = document.querySelectorAll("data")


for(let i = 0; i < otherLink.length; i++){
  otherLink[i].addEventListener("click", () => {
    localStorage.setItem("id",`${i + 1}`)
    document.location.href = "blog-page.html"
  })
}

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

async function getData(){
  try{
    const response = await fetch("https://george.pythonanywhere.com/api/blogs/")
    if(!response.ok){
      throw new Error(`Error! Status: ${response.status}`)
    }
    const data = await response.json()
    
    for(let i = 0; i < data.length; i++){
    `<button class="filter-button application">${data[i].categories[0].title}</button>
     <button class="filter-button AI">${data[i].categories[0].title}</button>
     <button class="filter-button uiux">${data[i].categories[0].title}</button>
     <button class="filter-button research">${data[i].categories[0].title}</button>
     <button class="filter-button figma">${data[i].categories[0].title}</button>`

    container.innerHTML += `<div class="cards">
    <img class="image" src=${data[i].image} alt="">
    <div class="card-bottom">
    <div class="name-date">
      <p class="name-nia name">${data[i].author}</p>
      <p class="date-1 date">${data[i].publish_date}</p>
    </div>
    <p class="title">${data[i].title}</p>
    <div class="card-filter">

    </div>
    <p class="Appendix">${data[i].description}</p>
    <p class="other-link">სრულად ნახვა <img src="Logos/Arrow.svg" alt=""></p>
    </div>
    </div>`
    
    }
    let cardFilter = document.querySelectorAll(".card-filter")
    for(let j = 0; j < cardFilter.length; j++){
      for(let z = 0; z < data[j].categories.length; z++){
        cardFilter[j].innerHTML +=
        `<button style = "color:white; background-color: ${data[j].categories[z].background_color}"
        class="filter-button">${data[j].categories[z].title}</button>`
      }
    }

    console.log(cardFilter)
    
  } catch (error){
    console.error("Error: ", error)
  }
}
getData()
