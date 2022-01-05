const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(express.json());
// 브라우저의 CORS이슈를 막기 위해 사용하는 코드
app.use(cors());

// get 방식 응답 지정
app.get('/products', async(req,res)=>{
    // get 방식 쿼리 데이터 전송
    const queryString = req.query;
    console.log(queryString.id);
    console.log(queryString.name);
    res.send({
        "products":[
            { "id":1, "name":"거실조명", "price":100000, "seller":"그린", "imageUrl": "/images/products/product1.jpg"},
            { "id":2, "name":"침실조명", "price":120000, "seller":"블루", "imageUrl": "/images/products/product2.jpg"},
            { "id":3, "name":"독서등", "price":20000, "seller":"옐로", "imageUrl": "/images/products/product3.jpg"},
            { "id":4, "name":"캠핑조명", "price":100000, "seller":"레드", "imageUrl": "/images/products/product4.jpg"},
            { "id":5, "name":"화장실조명", "price":50000, "seller":"명보", "imageUrl": "/images/products/product1.jpg"},
            { "id":6, "name":"부엌조명", "price":80000, "seller":"동경", "imageUrl": "/images/products/product2.jpg"},
            { "id":7, "name":"스마트조명", "price":300000, "seller":"규성", "imageUrl": "/images/products/product3.jpg"},
            { "id":8, "name":"유아조명", "price":50000, "seller":"세훈", "imageUrl": "/images/products/product4.jpg"} 
        ] 
    });
})
// post 방식 응답 지정
app.post('/products', async(req,res)=>{
    const body = req.body;
    console.log(body);
    res.send('상품이 등록되었습니다.');
})
// get 방식 경로 파라미터 관리하기
app.get('/products/:id',async(req,res) => {
    const params = req.params;
    console.log(params);
    res.send('파라미터 관리하기');
})

// 설정한 app을 실행시키기
app.listen(port, ()=>{
    console.log('그린 램프 서버가 실행 중입니다.');
})