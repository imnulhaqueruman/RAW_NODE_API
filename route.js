// title : route 
// description : application routing 
// dependencies

const {sampleHandler} = require('./handlers/handlersRoutes/sampleRoutes')
const {userHandler} = require('./handlers/handlersRoutes/userHandler')
const routes = {
    sample: sampleHandler,
    user: userHandler
}

module.exports = routes;