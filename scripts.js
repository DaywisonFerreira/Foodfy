const modal = document.querySelector('.modal-overlay')
const pratos = document.querySelectorAll('.prato')

for(let prato of pratos){
    prato.addEventListener('click', function(){
        const imgPrato = prato.getAttribute('data-id')
        const img = `layouts/assets/${imgPrato}.png`
        const pratoNome = prato.querySelector('.container-prato p').innerHTML
        const chefe = prato.querySelector('.container-chefe p').innerHTML
        

        modal.querySelector('img').src = img
        modal.querySelector('.modal-container-prato p').innerHTML = pratoNome
        modal.querySelector('.modal-container-chefe p').innerHTML = chefe
        modal.classList.add('active')

    })
}

const closeModal = modal.querySelector('.close-modal')
closeModal.addEventListener('click', function(){
    modal.classList.remove('active')
})
