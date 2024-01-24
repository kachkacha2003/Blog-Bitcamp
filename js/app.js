var swiper = new Swiper(".s1", {
  slidesPerView: 3,
  spaceBetween: 32,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// image upload function
let uploadImagesBlock = document.querySelector(".upload_images_block");
let deleteBtn = document.querySelector(".delete_btn");
let uploadedImgBlock = document.querySelector(".uploaded_image");
let file = "";
let imgVar = "";

function previewImage() {
  let fileInput = document.querySelector("#fileInput");
  let imageName = document.querySelector(".image_name");

  if (fileInput.files.length > 0) {
    file = fileInput.files[0];
    imageName.textContent = file.name;
    uploadImagesBlock.style.display = "none";
    uploadedImgBlock.style.display = "flex";
    imgVar = true;
    inputFilledFunction();
  } else {
    imageName.textContent = "";
  }
}

function deleteFunction() {
  deleteBtn.addEventListener("click", function () {
    file = fileInput.value = "";
    uploadedImgBlock.style.display = "none";
    uploadImagesBlock.style.display = "inline-block";
  });
}

deleteFunction();

//author input validation functions

let authorInput = document.querySelector(".author_input");
let listArr = document.querySelectorAll(".li_item");
let minSimbols = document.querySelector(".min_simbols");
let languageRequire = document.querySelector(".language_");
let minWords = document.querySelector(".min_words");
let authorVarSimbols = "";
let authorVarWords = "";
let georgianVar = "";

function authorValidation() {
  if (authorInput.value.trim().length < 4) {
    minSimbols.style.color = "#EA1919";
    authorVarSimbols = true;
    inputFilledFunction();
  } else {
    minSimbols.style.color = "#85858d";
  }
}

function minWordValidation() {
  let minWordsValidation = authorInput.value.trim();
  console.log(minWordsValidation);
  let minWordsSplit = minWordsValidation.split(" ").length;
  console.log(typeof minWordsSplit);

  if (minWordsSplit < 2) {
    minWords.style.color = "#EA1919";
    authorVarWords = true;
    inputFilledFunction();
  } else {
    minWords.style.color = "#85858d";
  }
}

authorInput.addEventListener("input", function () {
  authorValidation();
  minWordValidation();
  validateInput();
});

function validateInput() {
  let georgianInput = authorInput.value.trim();
  console.log(georgianInput);
  // Regular expression for Georgian Unicode characters
  let georgianRegex = /^[\u10A0-\u10FF\s]+$/;

  if (georgianRegex.test(georgianInput)) {
    languageRequire.style.color = "#85858d";
    georgianVar = true;
    inputFilledFunction();
  } else {
    languageRequire.style.color = "#EA1919";
  }
}

//title input validation

let titleInput = document.querySelector(".title_input");
let titleValidTxt = document.querySelector(".title_validation");
let titleVar = "";

titleInput.addEventListener("input", function () {
  titleValidation();
});

function titleValidation() {
  if (titleInput.value.trim().length > 2) {
    titleValidTxt.style.color = "#85858d";
    titleVar = true;
    inputFilledFunction();
  } else {
    titleValidTxt.style.color = " #EA1919 ";
  }
}

//description input validation

let blogTxtarea = document.querySelector(".blog_txtarea ");
let txtareaValidation = document.querySelector(".txtarea_validation");
let txtVar = "";

blogTxtarea.addEventListener("input", function () {
  blogValidation();
});
function blogValidation() {
  if (blogTxtarea.value.trim().length >= 2) {
    txtareaValidation.style.color = " #e4e3eb ";
    txtVar = true;
    inputFilledFunction();
  } else {
    txtareaValidation.style.color = "#EA1919";
  }
}

//date input validation

let dateValidation = document.querySelector(".date_input");
let dateVar = "";

dateValidation.addEventListener("input", function () {
  dateValidationFun();
});

function dateValidationFun() {
  let dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  let inputValue = dateValidation.value;

  let isValid = dateRegex.test(inputValue);
  if (isValid) {
    dateValidation.style.border = "1px solid #85858d";
    dateVar = true;
    inputFilledFunction();
  } else {
    dateValidation.style.border = "1px solid #EA1919";
  }
}
// category validation

let dropbtn = document.querySelector(".dropdown");
let dropdownButton = document.querySelector(".dropbtn");
let dropParentBtn = document.querySelector(".btn_item");
let dropdownContent = document.querySelector(".dropdown-content");
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let droplabels = document.querySelectorAll(".drop_label");
let selectedVar = "";

dropdownButton.addEventListener("click", function (e) {
  e.preventDefault();
  dropbtn.classList.toggle("active");
  selectFunction();
});

function selectFunction() {
  let selectedLabels = [];
  checkboxes.forEach(function (checkbox, index) {
    if (checkbox.checked) {
      let newElement = `<div class="inner_item">${droplabels[index].textContent}<span class="dlt-btn" 
      onclick="removeItem(${index})"><i class="fa-solid fa-xmark"></i></span></div>`;
      selectedLabels.push(newElement);
    }
  });
  if (selectedLabels.length > 0) {
    dropdownButton.innerHTML = selectedLabels.join("");
    selectedVar = true;
    inputFilledFunction();
  } else {
    dropdownButton.innerHTML = "შეიყვანეთ სათაური";
  }
}
function removeItem(index) {
  checkboxes[index].checked = false;
  selectFunction();
}

//email input validation

let emailValidation = document.querySelector(".emai_input");
let importantMsg = document.querySelector(".important_msg");
let emailVar = "";

emailValidation.addEventListener("input", function () {
  emailvalidFun();
});

function emailvalidFun() {
  let emailRegex = /^.+@redberry\.ge$/;
  let inputValue = emailValidation.value.trim();
  let isValid = emailRegex.test(inputValue);

  if (isValid) {
    importantMsg.style.display = "none";
    emailVar = true;
    inputFilledFunction();
  } else {
    importantMsg.style.display = "flex";
  }
}

//send button function

let sendButton = document.querySelector(".send_btn");

function inputFilledFunction() {
  if (
    imgVar == true &&
    authorVarSimbols == true &&
    authorVarWords == true &&
    georgianVar == true &&
    titleVar == true &&
    txtVar == true &&
    dateVar == true &&
    selectedVar == true &&
    emailVar == true
  ) {
    sendButton.classList.add("btnactive");
  }
}

inputFilledFunction();

let successBody = document.querySelector(".success_body");
let close = document.querySelector(".close");

sendButton.addEventListener("click", function (e) {
  e.preventDefault();
  successBody.style.visibility = "visible";
  successBody.style.opacity = "1";
});

close.addEventListener("click", function (e) {
  successBody.style.visibility = "hidden";
  successBody.style.opacity = "0";
});
