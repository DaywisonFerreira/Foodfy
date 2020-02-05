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
           document.getElementById(id).style.display = "none";
        } else {
            link.innerHTML = 'Esconder'
            document.getElementById(id).style.display = "block";
        }
        
    })
}
