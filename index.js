// title Uptime monitoring API 

// dependencies
const http = require('http')
const{handleReqRes} = require('./helpers/handleReqRes')

// app object -module scaffolding 
const app ={}

// configure 

app.config = {
    port: 3000,
}

// create server 
app.createServer = () => {
    const server = http.createServer(app.handleReqRes)
    server.listen(app.config.port, () =>{
        console.log(`Server listening to ${app.config.port}`)
    })
}

// handle req res
app.handleReqRes = handleReqRes;

// server call 
app.createServer() 