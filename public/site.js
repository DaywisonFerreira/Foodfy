const currentPage = location.pathname
const menuItems = document.querySelectorAll(".links .menus a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add('active-site')
    }
}


const links = document.querySelectorAll('.informacao-receitas a')

for(let link of links) {
    link.addEventListener('click', function(){
        const id = link.getAttribute('class')        
        const text = link.innerHTML
        link.innerHTML = 'Esconder'
        if(text == 'Esconder') {
            link.innerHTML = 'Mostrar'           
        }
        document.getElementById(id).classList.toggle('esconder');
        
    })
}

