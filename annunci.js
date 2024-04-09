
// ANIMAZIONE CAMBIO COLORI DELLA NAV DOPO LO SCROLL
let navbar = document.querySelector(".navbar");
let links = document.querySelectorAll(".nav-link");
// MESSA IN ASCOLTO DELL'EVENTO SCROLL
window.addEventListener("scroll", () => {
    let scrolled = window.scrollY;
    //VARIAZIONI IN BASE ALLA PRESENZA O NO DELLO SCROLL
    if (scrolled > 0) {
        changeNavbar('nav-blur', "var(--white)", "2px solid var(--violet)" , "transparent");
    } else {
        changeNavbar('navbar', "var(--black)", "transparent" , "transparent");
    };
});
// FUNZIONE CHE CAMBIA GLI STILI DEI LINK
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

localStorage()

// OTTENERE I DATI DA "ANNUNCI.JSON"

fetch("./annunci.json")
.then((response) => response.json())
.then((data) => {
    
    
    let setCategory = () => {
        // CREAZIONE ARRAY CON LE CATEGORIE
        let category = data.map((annuncio)=> annuncio.category);
        
        // CREAZIONE ARRAY CON CATEGORIE FILTRATE
        let filteredCategory = [];
        category.forEach(category => {
            // SE NON E' GIA INCLUSO IN filteredcategory VIENE PUSHATO
            if (!filteredCategory.includes(category)) {
                filteredCategory.push(category);
            }
        });
        
        // CREAZIONE SWITCH CATEGORIE
        let category_wrapper = document.querySelector('.category_wrapper');
        
        filteredCategory.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
            
            <input class="form-check-input" type="radio" name="category" id="${category}">
            <label class="form-check-label" for="${category}">
            ${category}
            </label>`
            
            
            category_wrapper.appendChild(div)
        });
        
    }
    setCategory();
    
    // CREAZIONE DELLE CARD
    let card_wrapper = document.querySelector('.card_wrapper');
    
    let showCards = (array) => {
        
        array.sort((a,b) => b.price - a.price);
        card_wrapper.innerHTML = '';
        array.forEach((annuncio) => {
            let div = document.createElement('div');
            div.classList.add('card');
            div.style.width = '18rem';
            div.innerHTML = `
            
            <img src="${annuncio.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${annuncio.name}</h5>
            <p class="card-text categoryCard">${annuncio.category}</p>
            <p>${annuncio.price}€</p>
            <a href="#" class="btn btn-primary">aggiungi al carrello</a>
            </div>
            `
            
            card_wrapper.appendChild(div);
        });
    }
    showCards(data);
    
    // FILTRO PER CATEGORIA
    let radios = document.querySelectorAll('.form-check-input');
    
    let FilterByCategory = () => {
        let checked = Array.from(radios).find((button)=>button.checked);
        let categoria = checked.id
        if (categoria != "all") {
            let filtered = data.filter((annuncio) => annuncio.category == categoria);
            showCards(filtered);
        }else{
            showCards(data);
        }
        
    }
    FilterByCategory();
    
    radios.forEach((button)=>{
        button.addEventListener('click', () => {
            FilterByCategory();
        })
    });
    
    // FILTRO PER PREZZO
    let inputPrice = document.querySelector('#inputPrice');
    let priceNumber = document.querySelector('#priceNumber');
    let setPriceInput =() =>{
        let maxPrice = data[0].price
        inputPrice.max = maxPrice;
        inputPrice.value = maxPrice;
        priceNumber.innerHTML = `${maxPrice}€`
    }
    setPriceInput()
    
    inputPrice.addEventListener("input", ()=>{
        priceNumber.innerHTML = inputPrice.value;
        filterByPrice();
    })
    
    let filterByPrice = () => {
        let filtered = data.filter((annuncio)=> +annuncio.price <= +inputPrice.value);
        showCards(filtered);
    }

    // FILTRO PER NOME
    let inputWord = document.querySelector('#inputWord');
    inputWord.addEventListener('input', ()=>{
        filterByWord();
    })

    let filterByWord = ()=> {
        let filtered = data.filter((annuncio)=> annuncio.name.toLowerCase().startsWith(inputWord.value.toLowerCase()));
        showCards(filtered);
    }
});