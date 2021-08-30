// utility function 
// check to JSON string to parse object 

// module scaffolding
const crypto = require('crypto')
const utilities={}
const environments = require('./utilities')

// parse JSON string to object

utilities.parseJSON = (joinString) =>{
    let output 
    try{
         output = JSON.parse(joinString)
    } 
    catch{
        output = {}
    }
    return output 
}
utilities.hash = (str) =>{
   if(typeof(str) === 'string' && str.length > 0){
       const hash = crypto 
       .createHmac('sha256', environments.secretKey)
       .update(str)
       .digest('hex')
       return hash
   }else{
       return false
   }
}

module.exports = utilities