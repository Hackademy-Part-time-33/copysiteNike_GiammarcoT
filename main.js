let navbar = document.querySelector(".navbar");
let links = document.querySelectorAll(".nav-link");

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

let count= 0
let interval = setInterval(()=>{
    if(count < 100){
        count++
        firstNumber.innerHTML = count;
    }else {
        clearInterval(interval);
        console.log("STO VOLANDO JACK");
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