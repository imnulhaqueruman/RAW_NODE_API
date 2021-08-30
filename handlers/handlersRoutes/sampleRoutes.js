// sample route 


// module scaffolding

const handle = {}

handle.sampleHandler = (requestProperties, callback) =>{
    console.log(requestProperties)
    callback(200, {
        message:'This is simple url'
    })
}

module.exports = handle