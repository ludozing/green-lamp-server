// node는 Common JS를 사용함
// import할 때 require를 사용

const http = require('http');
// 127.0.0.1은 localhost와 같다. 내 컴퓨터의 주소를 의미한다.
const hostname = "127.0.0.1";
const port = 8080;

// 서버 만들기 createServer
const server = http.createServer(function(req,res){
    // 요청되는 정보 req
    // 응답하는 정보 res
    const path = req.url;
    const method = req.method;
    if(path === "/products"){
        if(method === "GET"){
            // 응답을 보낼 때 json 객체 타입을 헤더에 보내겠다.
            res.writeHead(200, {'Content-Type':'application/json'})
            const products = JSON.stringify([
                {
                    name: "거실조명",
                    price: 50000
                }
            ])
            res.end(products);
        }else if(method === "POST"){
            res.end("생성되었습니다.");
        }
    }
    console.log('요청하는 정보: ', req);
    res.end("Hello Client!");
})

// 
server.listen(port,hostname);
console.log('그린 조명 서버 on!');