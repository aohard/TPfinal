const img = document.getElementsByClassName("img");
const dotBox = document.querySelector(".puntitos")
let indice = 0;

function puntitos(){
  dotBox.innerHTML = '';
  
  for(i =0 ; i < img.length ; i++){
    
      let puntito = document.createRange().createContextualFragment(`
      <label class="label">
      <input id="dot${[i]}" type="radio" name="grupoBanner">
      <div class="button">
      <span class="shadow"></span>
      `);
      dotBox.append(puntito);
  
  document.getElementById(`dot${i}`).addEventListener("click",() => {
    indice = i;
    mostrarImg()
  })

    }
}




function mostrarImg() {
  
  function seleccionarDot(i){
    let check = document.getElementById(`dot${i}`)
    return check.checked = true
  }

  for (let i = 0; i < img.length; i++) {
    img[i].style.display = "none";  
  }

  if (indice >= img.length) {
    indice = 0;
  } else if (indice < 0) {
    indice = img.length - 1;
  }
  
  img[indice].style.display = "block";
  seleccionarDot(indice)
}



document.getElementById("prevBtn").addEventListener("click", () => {
  indice--;
  mostrarImg();
  console.log(indice)
});

document.getElementById("nextBtn").addEventListener("click", () => {
  indice++;
  mostrarImg();
  console.log(indice)
});

puntitos();
mostrarImg();