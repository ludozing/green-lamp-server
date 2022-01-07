const express = require("express");
const cors = require("cors");
const app = express();
// heroku에서 지정하는 게 있으면 그 포트번호를 사용하고
// 없으면 8080을 사용하도록 설정
const port = process.env.PORT || 8080;
const models = require('./models');
app.use(cors());
// 해당 파일을 보여줄 때 입력한 경로대로 보여주기 위한 세팅
app.use("/upload",express.static("upload"));
// 업로드 이미지를 관리하는 스토리지 서버로 멀터를 사용하겠다.
const multer = require('multer');
// 이미지 파일이 업로드되면 어디에 저장할 것인지 지정
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cd){
            // 어디에 저장할 건지 지정
            cd(null, 'upload/')
        },
        filename: function(req, file, cd){
            // 어떤 이름으로 저장할 건지 지정
            // 파일에 있는 원본 이름으로 저장하겠다.
            cd(null, file.originalname)
        }
    })
});

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
    // 데이터베이스 조회하기
    // findAll 전체항목조회 findOne 하나만 조회
    // 조건지정할 수 있음
    // limit로 항목갯수지정
    // order 정렬변경
    // attributes 원하는 컬럼만 선택
    models.Products.findAll({
        limit: 8,
        order: [
            ["createdAt","DESC"]
        ],
        attributes: [
            "id",
            "name",
            "seller",
            "createdAt",
            "imgUrl"
        ]
    })
    .then((result)=>{
        res.send({
            products: result
        })
    })
    .catch((error)=>{
        console.error(error);
        res.send("데이터 조회 중 문제가 발생했습니다.")
    })
})
// post 방식 응답 지정
app.post('/products', async(req,res)=>{
    const body = req.body;
    const { name, description, price, seller, imgUrl } = body;
    // Products 테이블에 데이터를 삽입 (mySQL의 insert같은...)
    models.Products.create({
        name: name,
        description: description,
        price: price,
        seller: seller,
        imgUrl: imgUrl
    }).then((result)=>{
        console.log("상품 생성 결과:", result);
        res.send({
            result,
        })
    })
    .catch((error)=>{
        console.error(error);
        res.send("상품 업로드 중 문제가 발생했습니다.");
    })
})
// get 방식 경로 파라미터 관리하기
app.get('/products/:id',async(req,res) => {
    const params = req.params;
    console.log(params);
    // 하나만 찾을 때는 (select 할 때는) findOne
    models.Products.findOne({
        // 조건절
        where: {
            id: params.id
        }
    })
    .then((result)=>{
        res.send({
            product: result,
        })
    })
    .catch(error => {
        console.error(error);
        res.send('상품조회 중 문제가 발생했습니다.')
    })
})
// 이미지 파일을 post 요청 했을 때 업로드 폴더에 이미지를 저장
app.post('/image', upload.single('image'),(req,res)=>{
    const file = req.file;
    res.send({
        imgUrl: file.destination + file.filename
    })
})
// delet삭제하기
app.delete('/products/:id',async(req,res)=>{
    const params = req.params;
    console.log('삭제삭제');
    models.Products.destroy({where: {id: params.id}})
    .then(res.send(
        "상품이 삭제되었습니다."
    ));
})
// banners로 요청이 왔을 때 응답하기
app.get("/banners",(req,res)=>{
    models.Banners.findAll({
        limit:3,
        attributes: ["imgUrl","id","href"]
    })
    .then(result=>{
        res.send({
            banners: result,
        })
    })
    .catch(error=>{
        console.error(error);
        res.send('에러가 발생했습니다.');
    })
})
// 설정한 app을 실행시키기
app.listen(port, ()=>{
    console.log('그린 램프 서버가 실행 중입니다.');
    models.sequelize
    .sync()
    .then(()=>{
        console.log('DB연결성공');
    })
    .catch(function(err){
        console.error(err);
        console.log('DB연결에러');
        process.exit();
    })
})