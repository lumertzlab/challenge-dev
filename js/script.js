// HEADER SCROLL

let className = "scroll-header";
let scrollTrigger = 60;

window.onscroll = function () {
  if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
    document.getElementsByTagName("header")[0].classList.add(className);
  } else {
    document.getElementsByTagName("header")[0].classList.remove(className);
  }
};

// MENU ANIMATION

let burger = document.getElementById("navTrigger"),
  nav = document.getElementById("navMenu");

burger.addEventListener("click", function (e) {
  this.classList.toggle("active");
  nav.classList.toggle("active");
});

// ACCORDION

const accordionItemHeaders = document.querySelectorAll(".accordion-item");

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    const currentlyActiveAccordionItemHeader = document.querySelector(
      ".accordion-item.active"
    );
    if (
      currentlyActiveAccordionItemHeader &&
      currentlyActiveAccordionItemHeader !== accordionItemHeader
    ) {
      currentlyActiveAccordionItemHeader.classList.toggle("active");
      currentlyActiveAccordionItemHeader.querySelector(
        ".accordion-item-body"
      ).style.maxHeight = 0;
    }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.querySelector(
      ".accordion-item-body"
    );
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

// SLIDER

let swiper = new Swiper(".slide-cards", {
  slidesPerView: 3,
  spaceBetween: 32,
  navigation: {
    nextEl: ".s-cards .swiper-button-next",
    prevEl: ".s-cards .swiper-button-prev",
  },
  pagination: {
    el: ".s-cards .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    300: {
      enabled: false,
      slidesPerView: 1,
      spaceBetween: 0,
    },
    600: {
      enabled: true,
      slidesPerView: 1.5,
      spaceBetween: 15,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1100: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

let firstCard = document.querySelector("#swiperSec div:nth-child(5)");
let secondCard = document.querySelector("#swiperSec div:nth-child(6)");
let thirdCard = document.querySelector("#swiperSec div:nth-child(7)");
let button = document.getElementById("btnCards");

button.addEventListener("click", function () {
  if (
    firstCard.classList.contains("responsive") &&
    secondCard.classList.contains("responsive") &&
    thirdCard.classList.contains("responsive")
  ) {
    firstCard.classList.remove("responsive");
    secondCard.classList.remove("responsive");
    thirdCard.classList.remove("responsive");
    button.innerHTML = "Show less";
  } else {
    firstCard.classList.add("responsive");
    secondCard.classList.add("responsive");
    thirdCard.classList.add("responsive");
    button.innerHTML = "See all";
  }
});

// CONTACT FORM

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br>Email: ${email.value}<br>Message: ${mess.value}`;

  Email.send({
    SecureToken: "4cc6db65-6de5-4fb7-986c-25a7f51d6f6f",
    To: "lumertz2001@gmail.com",
    From: "lumertz2001@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
      });
    }
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[0].value != "") {
      checkName();
    }

    items[0].addEventListener("keyup", () => {
      checkName();
    });

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkName() {
  const nameRegex = /[a-zA-Z ]*/;
  const errorTxtName = document.querySelector(".error-txt.name");

  if (!fullName.value.match(nameRegex)) {
    fullName.classList.add("error");
    fullName.parentElement.classList.add("error");

    if (fullName.value != "") {
      errorTxtName.innerText = "Enter a valid name";
    } else {
      errorTxtName.innerText = "Name field can't be blank";
    }
  } else if (fullName.value.length <= 3) {
    fullName.classList.add("error");
    fullName.parentElement.classList.add("error");
    errorTxtName.innerText = "Invalid name length";
  } else {
    fullName.classList.remove("error");
    fullName.parentElement.classList.remove("error");
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerText = "Enter a valid email address";
    } else {
      errorTxtEmail.innerText = "Email Address can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !fullName.classList.contains("error") &&
    !email.classList.contains("error") &&
    phone.classList.contains("error") &&
    subject.classList.contains("error") &&
    !mess.classList.contains("error")
  ) {
    sendEmail();

    form.reset();
    return false;
  }
});

// SCROLL ANIMATION

AOS.init({
  duration: 1000,
  once: true,
});
