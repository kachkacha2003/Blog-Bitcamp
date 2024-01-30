const login = document.querySelector(".login-button")
const modal = document.querySelector(".modal")
const closeModal = document.querySelector(".close")
const form = document.querySelector(".form")
const overlay = document.querySelector(".overlay")
const container = document.querySelector(".info-cards")


const allElem = document.querySelectorAll("data")


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
    <p class="other-link">სრულად ნახვა<img src="Logos/Arrow.svg" alt=""></p>
    </div>
    </div>`
    }

    const otherLink = document.querySelectorAll(".other-link")
    for(let i = 0; i < otherLink.length; i++){
      otherLink[i].addEventListener("click", () => {
        localStorage.setItem("id",`${i + 1}`)
        document.location.href = "blog-page.html"
      })
    }

    let cardFilter = document.querySelectorAll(".card-filter")
    for(let j = 0; j < cardFilter.length; j++){
      for(let z = 0; z < data[j].categories.length; z++){
        cardFilter[j].innerHTML +=
        `<button style = "color:white; background-color: ${data[j].categories[z].background_color}"
        class="filter-button">${data[j].categories[z].title}</button>`
      }
    }
    
  } catch (error){
    console.error("Error: ", error)
  }
}
getData()

const filterBox = document.querySelector(".filter-div");
const filterButtons = document.querySelectorAll(".filter-button");

async function getCategories(){
  try{
    const response = await fetch("https://george.pythonanywhere.com/api/categories/")
    if(!response.ok){
      throw new Error(`Error! Status: ${response.status}`)
    }
    const data = await response.json()

    const check = {}
    const res = []

    for(let j = 0; j < data.length; j++){
      if(!check.hasOwnProperty(data[j].title)){
        check[data[j].title] = true
        res.push(data[j])
      }
    }

    for(let i = 0; i < res.length; i++){
     filterBox.innerHTML +=`<button style = "color:white; background-color: ${res[i].background_color}"
      class="filter-button">${res[i].title}</button>`


      console.log(res)
    }
    console.log(data)
  } catch (error){
    console.error("Error: ", error)
  }
}
getCategories()




