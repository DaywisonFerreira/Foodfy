const modal = document.querySelector('.modal-overlay')
const pratos = document.querySelectorAll('.prato')

for(let prato of pratos){
    prato.addEventListener('click', function(){
        const index = prato.getAttribute('id')
        
        window.location.href = `/recipes/${index}`

    })
}

const links = document.querySelectorAll('.informacao-receitas a')

for(let link of links) {
    link.addEventListener('click', function(){
        const id = link.getAttribute('class')        
        const text = link.innerHTML

        if(text == 'Esconder') {
            link.innerHTML = 'Mostrar'           
        } 
        document.getElementById(id).classList.toggle('esconder');
        
    })
}

function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");
  
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
  }
  
  document.querySelector(".add-ingredient").addEventListener("click", addIngredient);


  function addPreparo() {
    const ingredients = document.querySelector("#modo-preparo");
    const fieldContainer = document.querySelectorAll(".preparo");
  
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
  }
  
  document.querySelector(".add-preparo").addEventListener("click", addPreparo);
