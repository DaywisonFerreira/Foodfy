const Chef = require('../models/Chef')
const LoadRecipeService = require('../services/LoadRecipeService')

async function getProfile(fileId) {
    let file = await Chef.profileImg(fileId)
    file.src = `${file.path.replace("public", "")}`
    return file
}


async function format(chef){
    const file = await getProfile(chef.file_id)
    const recipes = await LoadRecipeService.load('recipes', {where: {
        chef_id: chef.id
    }})
    chef.img = file.src
    chef.recipes = recipes
    chef.total_recipes = await Chef.getTotalRecipes(chef.id)

    return chef
}

const LoadService = {
    load(service, filter) {
        this.filter = filter
        return this[service]()
    },
    async chef(){
        try {
            const chef = await Chef.findOne(this.filter)
            return format(chef)
        } catch (error) {
            console.error(error)
        }
    },
    async chefs(){
        try {
            const chefs = await Chef.findAll(this.filter)
            const chefsPromise = chefs.map(format)
            return Promise.all(chefsPromise)
        } catch (error) {
            console.error(error)
        }
    },
    format
}

module.exports = LoadService
