// sample route 


// module scaffolding

const handler = {}

handler.sampleHandler = (requestProperties, callback) =>{
    console.log(requestProperties)
    callback(200, {
        message:'This is simple url'
    })
}

module.exports = handler