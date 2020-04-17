let currentPage = location.pathname.split('/')
currentPage = currentPage[currentPage.length - 1]
const menuItems = document.querySelectorAll(".header-admin a")
for (item of menuItems) {
    if(item.getAttribute("href").includes(currentPage)) {        
        item.classList.add('menu-active')
    }
}

const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) return


        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo") {
                photosDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > uploadLimit) {
            alert(" Você atingiu o limite máximo de fotos ")
            event.preventDefault()
            return true
        }

        return false
    },
    checkExistPhoto(event){
        const { preview } = PhotosUpload

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo") {
                photosDiv.push(item)
            }
        })
        if(photosDiv.length < 1) {
            alert('Você deve enviar pelo menos uma foto')
            event.preventDefault()
            return true
        }
        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode // <div class="photo">
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove();
    },
    removeOldPhoto(event) {
        const photoDIv = event.target.parentNode

        if (photoDIv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]')

            if(removedFiles) {
                removedFiles.value += `${photoDIv.id},`
            }
        }

        photoDIv.remove()
    }
    
}

const Validate = {
    apply(input, func) {
        Validate.clearErrors(input)
            let results = Validate[func](input.value)
            input.value = results.value

            if(results.error) {
                Validate.displayError(input, results.error)
            }
    },
    displayError(input, error) {
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)

        input.focus()
    },
    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector(".error")
        if(errorDiv) {
            errorDiv.remove()
        }
    },
    isEmail(value) {
        let error = null
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat))
            error = "Email inválido"

        return {
            error,
            value
        }
    },
    allFields(e) {
        const items = document.querySelectorAll('.fields input, .fields select, .fields textarea')
        
        for (item of items) {
            if (item.value == "" && item.name != "removed_files") {
                const message = document.createElement('div')
                message.classList.add('messages')
                message.classList.add('error')
                message.style.position = 'fixed'
                message.innerHTML = 'Todos os campos aqui são obrigatórios.'
                document.querySelector('body').append(message)
                e.preventDefault()
            }
        }
    }
}


const imgRecipes = document.querySelectorAll('.imgRecipe')
const imgBanner = document.querySelector('.receita-banner img')

for(let img of imgRecipes) {
    img.addEventListener("click", function(){
        document.querySelector('.bannerActive').classList.remove('bannerActive')
        imgBanner.src = img.src
        img.classList.add('bannerActive')
    })
}