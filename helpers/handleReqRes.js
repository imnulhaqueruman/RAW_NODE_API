const url = require('url')
const {StringDecoder} = require('string_decoder')
const routes = require('../route')
const{notFound} = require('../handlers/handlersRoutes/notFound')

const handler = {}
handler.handleReqRes = (req,res) =>{
    // request handling
    const parsedUrl =  url.parse(req.url,true)
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,"")
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query
    const headersObject = req.headers;

    const requestProperties ={
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject
    }

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFound;

    

    const decoder = new StringDecoder('utf-8')
    let realData = ''
    req.on('data', (buffer) =>{
         realData += decoder.write(buffer)
    })
    req.on('end' , () =>{
        realData += decoder.end();
        chosenHandler(requestProperties,(statusCode,payLoad) =>{
            statusCode = typeof(statusCode) === 'number' ? statusCode:500;
            payLoad = typeof(payLoad) === 'object'? payLoad:{};
    
            const payLoadString = JSON.stringify(payLoad)
    
            res.writeHead(statusCode);
            res.end(payLoadString)
        })
    
        
        console.log(realData)
        res.end('Hello Programmers')
    })


    
}
module.exports = handler