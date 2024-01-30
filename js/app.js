var swiper = new Swiper(".s1", {
  slidesPerView: 3,
  spaceBetween: 32,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

localStorage.getItem("id")

// image upload function
let sendButton = document.querySelector(".send_btn");
let endBtn = document.querySelector(".end_btn");
let uploadImagesBlock = document.querySelector(".upload_images_block");
let deleteBtn = document.querySelector(".delete_btn");
let uploadedImgBlock = document.querySelector(".uploaded_image");
let file = "";
let imgVar = false;
let imgData;
let fileInput = document.querySelector("#fileInput");

function previewImage() {
  let imageName = document.querySelector(".image_name");
  if (fileInput.files.length > 0) {
    file = fileInput.files[0];
    if (file.type && file.type.indexOf("image") === 0) {
      imgData = URL.createObjectURL(file);
      imgData = imgData.replace("blob:", "");
    } else {
      imageName.textContent = "Please select an image file.";
      return;
    }
    imageName.textContent = file.name;
    uploadImagesBlock.style.display = "none";
    uploadedImgBlock.style.display = "flex";
    imgVar = true;
    inputFilledFunction();
  } else {
    imageName.textContent = "";
  }
}
previewImage();

function deleteFunction() {
  deleteBtn.addEventListener("click", function () {
    file = fileInput.value = "";
    uploadedImgBlock.style.display = "none";
    uploadImagesBlock.style.display = "inline-block";
    imgVar = false;
    inputFilledFunction();
  });
}
deleteFunction();
//author input validation functions

let authorInput = document.querySelector(".author_input");
let listArr = document.querySelectorAll(".li_item");
let minSimbols = document.querySelector(".min_simbols");
let languageRequire = document.querySelector(".language_");
let minWords = document.querySelector(".min_words");
let authorVarSimbols = false;
let authorVarWords = false;
let georgianVar = false;

function inputFilledFunction() {
  if (
    imgVar &&
    authorVarSimbols &&
    authorVarWords &&
    georgianVar &&
    titleVar &&
    txtVar &&
    dateVar &&
    selectedVar &&
    emailVar
  ) {
    sendButton.style.display = "none";
    endBtn.style.display = "block";
  } else {
    sendButton.style.display = "block";
    endBtn.style.display = "none";
  }
}

function authorValidation() {
  if (authorInput.value.trim().length < 4) {
    minSimbols.style.color = "#EA1919";
    authorVarSimbols = false;
  } else {
    minSimbols.style.color = "#85858d";
    authorVarSimbols = true;
  }
}

function minWordValidation() {
  let minWordsValidation = authorInput.value.trim();
  let minWordsSplit = minWordsValidation.split(" ").length;

  if (minWordsSplit < 2) {
    minWords.style.color = "#EA1919";
    authorVarWords = false;
  } else {
    minWords.style.color = "#85858d";
    authorVarWords = true;
  }
}

function validateInput() {
  let georgianInput = authorInput.value.trim();
  // Regular expression for Georgian Unicode characters
  let georgianRegex = /^[\u10A0-\u10FF\s]+$/;

  if (georgianRegex.test(georgianInput)) {
    languageRequire.style.color = "#85858d";
    georgianVar = true;
  } else {
    languageRequire.style.color = "#EA1919";
    georgianVar = false;
  }
}
authorInput.addEventListener("input", function () {
  authorValidation();
  minWordValidation();
  validateInput();
  inputFilledFunction();
});

//title input validation

let titleInput = document.querySelector(".title_input");
let titleValidTxt = document.querySelector(".title_validation");
let titleVar = false;

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
    titleVar = false;
    inputFilledFunction();
  }
}

//description input validation

let blogTxtarea = document.querySelector(".blog_txtarea ");
let txtareaValidation = document.querySelector(".txtarea_validation");
let txtVar = false;

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
    txtVar = false;
    inputFilledFunction();
  }
}

//date input validation

let dateValidation = document.querySelector(".date_input");
let dateVar = false;

dateValidation.addEventListener("input", function () {
  dateValidationFun();
});

function dateValidationFun() {
  let inputValue = dateValidation.value;

  if (inputValue) {
    dateValidation.style.border = "1px solid #85858d";
    dateVar = true;
    inputFilledFunction();
  } else {
    dateValidation.style.border = "1px solid #EA1919";
    dateVar = false;
    inputFilledFunction();
  }
}
// category validation

let dropbtn = document.querySelector(".dropdown");
let dropdownButton = document.querySelector(".dropbtn");
let dropParentBtn = document.querySelector(".btn_item");
let dropdownContent = document.querySelector(".dropdown-content");
// let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let categoryData;

let selectedVar = false;

dropdownButton.addEventListener("click", function (e) {
  e.preventDefault();
  dropbtn.classList.toggle("active");
  // selectFunction();
});

function selectFunction() {
  let selectedLabels = [];
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let droplabels = document.querySelectorAll(".drop_label label");
  checkboxes.forEach(function (checkbox, index) {
    if (checkbox.checked) {
      let newElement = `<div class="inner_item" style="background-color: ${droplabels[index].style.backgroundColor}">
      ${droplabels[index].innerHTML}<span class="dlt-btn" 
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
    selectedVar = false;
    inputFilledFunction();
  }
  const parser = new DOMParser();
  const html = parser.parseFromString(selectedLabels, "text/html");
  let array = Array.from(html.body.children);
  categoryData = array.map((item) => {
    return {
      title: item.textContent,
      text_color: "white",
      background_color: item.style.backgroundColor,
    };
  });
}
function removeItem(index) {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes[index].checked = false;
  selectFunction();
}

//category API

async function categoryFunction() {
  const response = await fetch(
    "https://george.pythonanywhere.com/api/categories/"
  );
  const data = await response.json();

  data.forEach((item, index) => {
    const checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("drop_label");
    checkboxLabel.innerHTML = `
      <input type="checkbox" value="${item.title}" id="${index}" class="checkboxs"/>
      <label for="${index}" style="background-color: ${item.background_color}">${item.title}</label>
    `;
    dropdownContent.appendChild(checkboxLabel);
    const checkbox = document.getElementById(index);
  });

  let checkboxItem = document.querySelectorAll(".checkboxs");

  checkboxItem.forEach(function (item) {
    item.addEventListener("change", function () {
      selectFunction();
    });
  });
}

categoryFunction();
//email input validation

let emailValidation = document.querySelector(".email_input");
let importantMsg = document.querySelector(".important_msg");
let emailVar = false;

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
    emailVar = false;
    inputFilledFunction();
  }
}

let successBody = document.querySelector(".success_body");
let close = document.querySelector(".close");

endBtn.addEventListener("click", function (e) {
  e.preventDefault();
  successBody.style.visibility = "visible";
  successBody.style.opacity = "1";
  postBlog();
  getTokenFunc("gigagiorgadze@redberry.ge").then((item) => postBlog(item));
});
close.addEventListener("click", function (e) {
  successBody.style.visibility = "hidden";
  successBody.style.opacity = "0";
});


// post blog

async function postBlog(item) {
  let response = await fetch(
    "https://george.pythonanywhere.com/api/blogs/create/",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${item.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categories: categoryData,
        title: titleInput.value,
        publish_date: dateValidation.value,
        description: blogTxtarea.value,
        image: imgData,
        email: emailValidation.value,
        author: authorInput.value,
      }),
    }
  );
  const data = await response.json();
}

const loginEndpoint = "https://george.pythonanywhere.com/api/login/";
let postToken = "";

async function getTokenFunc(email) {
  try {
    let response = await fetch(loginEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email, //obj property shorthand
      }),
    });

    let data = await response.json();
    return data;
    if (!response.ok) {
      throw new error("Failed this post");
    }
  } catch (error) {
    return error.message;
  }
}

