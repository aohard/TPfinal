let divAnimado = document.querySelector('.fondo');
let divContainer = document.querySelector(".info")

divContainer.addEventListener("mouseenter", () => {
    divAnimado.classList.add("active");
});

divContainer.addEventListener("mouseleave", () => {
    divAnimado.classList.remove("active");
});