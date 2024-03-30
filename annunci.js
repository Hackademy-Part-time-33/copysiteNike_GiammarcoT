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

fetch("./annunci.json")
.then((response) => response.json())
.then((data) => {

    let annunciContainer = document.querySelector('.annunci');
    data.forEach((annuncio) => {
        // CREAZIONE NUOVO DIV PER OGNI ANNUNCIO
        let card = document.createElement('div');
        card.classList.add('col-12', 'col-md-4', 'mb-3', 'mt-5');
        
        // CREAZIONE CARD ANNUNCIO
        card.innerHTML = `
        <div class="card">
        <img src="${annuncio.image}" class="card-img-top" alt="articoloimg">
        <div class="card-body">
        <h3 class="card-title">${annuncio.name}</h3>
        <h4 class="card-text">${annuncio.price}€</h4>
        <p class="card-text">${annuncio.category}</p>
        <a href="#" class="btn btn-primary">aggiungi al carrello</a>
        </div>
        </div>
        `;
        annunciContainer.appendChild(card);
    });
});
