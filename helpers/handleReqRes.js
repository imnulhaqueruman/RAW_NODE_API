const url = require('url')
const {StringDecoder} = require('string_decoder')
const routes = require('../route')
const{notFound} = require('../handlers/handlersRoutes/notFound')
const{parseJSON} = require('../hepler/utilities')

const handler = {}
handler.handleReqRes = (req,res) =>{
    // request handling
    const parsedUrl =  url.parse(req.url,true)
    console.log(req)
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
         
        requestProperties.body = parseJSON(realData);

        chosenHandler(requestProperties,(statusCode,payLoad) =>{
            statusCode = typeof(statusCode) === 'number' ? statusCode:500;
            payLoad = typeof(payLoad) === 'object'? payLoad:{};
    
            const payLoadString = JSON.stringify(payLoad)
            // return the final response 
        res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode);
            res.end(payLoadString)
        })
    
        
        console.log(realData)
        res.end('Hello Programmers')
    })


    
}
module.exports = handler