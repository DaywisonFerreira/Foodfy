const { unlinkSync } = require('fs')

module.exports = {
    date: function(timestamp) {
        const date = new Date(timestamp);
        const day = `0${date.getUTCDate()}`.slice(-2)
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const year = date.getUTCFullYear()
        
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        }
    }
}

module.exports = {
    excludeFile: function(file){
        try {
            unlinkSync(file.path)  
        } catch (error) {
            console.error(error)
        }
    }
}