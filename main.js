let navbar = document.querySelector(".navbar");
let links = document.querySelectorAll(".nav-link");

// ANIMAZIONE CAMBIO COLORE NAV DOPO SCROLL

window.addEventListener("scroll", () => {
  let scrolled = window.scrollY;
  
  if (scrolled > 0) {
    changeNavbar('nav-blur', "var(--white)", "2px solid var(--violet)" , "transparent");
  } else {
    changeNavbar('navbar', "var(--black)", "transparent" , "transparent");
  };
});

function changeNavbar(background, color1, color2, color3) {
  navbar.classList.remove('nav-blur');
  navbar.classList.add(background);
  links.forEach((link) => {
    link.style.color = color1;
    link.addEventListener("mouseenter", () => {
      link.style.borderBottom = color2;
    });
    link.addEventListener("mouseleave", () => {
      link.style.borderBottom = color3;
    });
  });
} 


let firstNumber = document.querySelector("#firstNumber");
let secondNumber = document.querySelector("#secondNumber");
let thirtNumber = document.querySelector("#thirtNumber");

// ANIMAZIONE NUMERI INCREMENTO AUTOMATICO

let count= 0
let interval = setInterval(()=>{
  if(count < 100){
    count++
    firstNumber.innerHTML = count;
  }else {
    clearInterval(interval);
  }
},10)

function createInterval(number , element, timing) {
  let count = 0; 
  let interval = setInterval(()=>{
    if(count < number){
      count++
      element.innerHTML = count;
    }else {
      clearInterval(interval);
    }
  },timing)  
};

let confirm = false;

let observer = new IntersectionObserver( (entries)=>{
  entries.forEach((entry)=>{
    
    if (entry.isIntersecting && confirm == false) {
      createInterval(2000 , firstNumber, 10);
      createInterval(3000 , secondNumber, 5);
      createInterval(50 , thirtNumber, 150);
      confirm = true
    }
    
  })
  
}); 
observer.observe(firstNumber);

// INIZIALIZZAZIONE SLIDER DI "SWIPER"

var swiper = new Swiper(".mySwiper", {
  speed: 600,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


let reviews = [
  {name: "Tizio", title: "Lorem ipsum", description: "Aliquamdictum mattis velit sit amet faucibus felis iaculis Nullala"},
  {name: "Caio", title: "Lorem ipsum", description: "Aliquamdictum mattis velit sit amet faucibus felis iaculis Nullala"},
  {name: "Bubu", title: "Lorem ipsum", description: "Aliquamdictum mattis velit sit amet faucibus felis iaculis Nullala"},
  {name: "Mario Rossi", title: "Lorem ipsum", description: "Aliquamdictum mattis velit sit amet faucibus felis iaculis Nullala"},
]


let swiperWrapper = document.querySelector('.swiper-wrapper');
let addReview = document.querySelector('#addReview');
let userName = document.querySelector('#userName');
let userTitle = document.querySelector('#userTitle');
let userDescription = document.querySelector('#userDescription');


let generateCards = () => {
  swiperWrapper.innerHTML = '';
  reviews.forEach((review) => {
    // CREAZIONE DIV
    let div = document.createElement('div');
    // AGGIUNTA CLASSE SWIPER AL DIV
    div.classList.add('swiper-slide');
    // INSERIMENTO DEL CONTENUTO DENTRO AL DIV CON UNA STRING INTERPOLATION
    div.innerHTML = `
    <div class="title" data-swiper-parallax="-300">${review.name}</div>
    <div class="subtitle" data-swiper-parallax="-200">${review.title}</div>
    <div class="text" data-swiper-parallax="-100">
    <p>
    ${review.description}
    </p>
    </div>`
    // APPENDERE AL DIV SWIPERWRAPPER I REVIEW
    swiperWrapper.appendChild(div);
    
  });
}
generateCards();

// AGGIUNTA TRAMITE FORM DI NUOVE REVIEW
addReview.addEventListener('click', () =>{
  
  reviews.push({name: userName.value, title: userTitle.value, description: userDescription.value});
  generateCards();
  // PULIZIA CAMPI INPUT
  userName.value = '';
  userTitle.value = '';
  userDescription.value = '';
  swiper.update();
});


// DARK MODE 
let btnDark = document.querySelector("#btnDark");
let isClicked = true;

btnDark.addEventListener("click", () =>{
  if (isClicked) { //DARK MODE
    document.documentElement.style.setProperty('--light', 'rgb(26,26,26)');
    document.documentElement.style.setProperty('--dark', 'rgb(250,250,250)');
    btnDark.innerHTML = `<i class="fa-regular fa-sun"></i>`;
    isClicked = false;
    localStorage.setItem('mode', 'dark');
  } else{ //LIGHT MODE
    document.documentElement.style.setProperty('--light', 'rgb(250,250,250)');
    document.documentElement.style.setProperty('--dark', 'rgb(26,26,26)');
    btnDark.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    isClicked = true;
    localStorage.setItem('mode', 'light');
  }
})


let mode = localStorage.getItem('mode');

if (mode === 'dark') {
  document.documentElement.style.setProperty('--light', 'rgb(26,26,26)');
  document.documentElement.style.setProperty('--dark', 'rgb(250,250,250)');
  btnDark.innerHTML = `<i class="fa-regular fa-sun"></i>`;
  isClicked = false;
}else{
  document.documentElement.style.setProperty('--light', 'rgb(250,250,250)');
  document.documentElement.style.setProperty('--dark', 'rgb(26,26,26)');
  btnDark.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  isClicked = true;
}
