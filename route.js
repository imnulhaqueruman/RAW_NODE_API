// title : route 
// description : application routing 
// dependencies

const {sampleHandler} = require('./handlers/handlersRoutes/sampleRoutes')
const routes = {
    'sample': sampleHandler
}

module.exports = routes;