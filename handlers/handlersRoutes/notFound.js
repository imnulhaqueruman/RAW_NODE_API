// notFound route 


// module scaffolding

const handler = {}

handler.notFound = (requestProperties,callback) =>{
    callback(404, {
        message:'Your requested url was not found'
    })
}

module.exports = handler