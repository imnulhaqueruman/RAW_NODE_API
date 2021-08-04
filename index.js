// title Uptime monitoring API 

// dependencies
const http = require('http')
const{handleReqRes} = require('./helpers/handleReqRes')
const environment = require('./hepler/environment')
const data = require('./lib/data')
// app object -module scaffolding 
const app ={}

// testing file system 
data.create('test','newFile',{'name':'Bangladesh','languages':'Bangla'},(err)=>{
    console.log('error was',err)
})
data.delete('test','newFile',(err)=>{
    console.log(err)
})


// create server 
app.createServer = () => {
    const server = http.createServer(app.handleReqRes)

    server.listen(environment.port, () =>{
        console.log(`Server listening to ${environment.port}`)
    })
}

// handle req res
app.handleReqRes = handleReqRes;

// server call 
app.createServer() 