// user route 

const handler = require("./notFound")
const data = require('../../lib/data')
const{hash} = require('../../hepler/utilities')

// module scaffolding

const handle = {}

handle.userHandler = (requestProperties, callback) =>{
    const allMethod=['get','post','put','delete']
    if(allMethod.indexOf(requestProperties.method) > -1){
          handler._users[requestProperties.method](requestProperties,callback)
    }else{
        callback(405)
    }
    callback(200, {
        message:'This is simple url'
    })
}
handler._users={}
handler._users.post = (requestProperties, callback) =>{
    const firstName =
     typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ?
      requestProperties.body.firstName: false;

    const lastName = 
    typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ?
     requestProperties.body.lastName: false;

    const phone = 
    typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length ===11 ? 
    requestProperties.body.phone: false;

    const passWord =
     typeof(requestProperties.body.passWord) === 'string' && requestProperties.body.passWord.trim().length > 0 ? 
     requestProperties.body.passWord: false;

    const tosAgreement = 
    typeof(requestProperties.body.tosAgreement) === 'boolean'
     && requestProperties.body.tosAgreement.trim().length > 0 ?
      requestProperties.body.tosAgreement: false;
    if(firstName && lastName && phone && passWord && tosAgreement){
        data.read('users', phone, (err,user) =>{
            if(err){
               let userObject={
                   firstName,
                   lastName,
                   phone,
                   password:hash(password)
               };
               data.create('users', phone, userObject, (err) =>{
                   if(!err){
                       callback(200, {error:'users created successfully'})
                   }else{
                       callback(500, {
                           error:'could not user create'
                       })
                   }
               })
            } else{
                callback(500, {
                    error:'There was a problem in server side',
                })
            }
        })
    }else{
        callback(400, {
            error:'Your have a problem in your request'
        })
    }
}
handler._users.get = (requestProperties, callback) =>{
    callback(200)
}
handler._users.put = (requestProperties, callback) =>{}
handler._users.delete = (requestProperties, callback) =>{}

module.exports = handle