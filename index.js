const http = require('http');
//const http2 = require('http2') https 임
const express = require("express");
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const db = require('./json/data.json');
const mysql = require('./routes/mysql');
const db_config = mysql.init();
mysql.connect(db_config);





const server = http.createServer((req,res) => {
    console.log('coming')
    console.log(req.headers)
    console.log(req.httpVersion)
    console.log(req.method)
    console.log(req.url);
    const url = req.url;

    //ㄴㅏ는 서버를 사용 안하고 express 를 사용했음
    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>test</title> </head>');
        res.write('<body><h1>오호라</h1></body>')
        res.write('</html>');

    }else if(url === '/courses'){
        res.write('Coures');
    }else {
        res.write('Not Found');
    }
    res.end()
});


app.listen(8080, (err) => {
    //console.log(`Server is running on ${3000} port`);
    if(err){
        return console.log(err);
    }else{
        return console.log('The server is lisening');
    }
});

/*js*/
app
app.use('/jquery',express.static(path.join(__dirname,'/node_modules/jquery/dist/jquery.min.js')));
app.use('/draggble',express.static(path.join(__dirname,'/node_modules/jquery-ui/ui/widgets/draggable.js')));
app.use('/jsroot',express.static(path.join(__dirname,'/js')));

/*css*/
app.use('/reset',express.static(path.join(__dirname,'/css/reset.css')));
app.use('/style',express.static(path.join(__dirname,'/css/style.css')));

//** handlebars 핵심 설정 시작 **//
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultLayout: 'main',    // 기본 레이아웃 파일 main.hbs 지정, 요청에 따라 레이아웃을 변경할수 있다.
    layoutsDir: __dirname + '/views/layouts/',  // 헨들바템플릿의 레이아웃 파일의 위치
    partialsDir: __dirname + '/views/partials/' // 파티셜이란: 레이아웃을 채울 header.hbs, left.hbs, footer.hbs 파일의 위치
} ) );

app.set( 'view engine', 'hbs' ); // handlebars파일의 확장자를 hbs로 사용.

/*
app.get 서버에 요청
app.post 아이디 또는 패스워드 서버에 보내줄떄 
app.delete
app.put 업데이트 개념
*/


//html 파일 보내는방법
/*
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

*/



//이런 미들웨어로 보여지는 페이지 컨트롤 가능
app.use(function(req,res,next){
    console.log('막혔다');
    req.user = {
        id: '1234',
    };
    next();
});


//라우터가 / 라면 index 렌더
app.get('/', function (req, res) {
    if(req.user.id == '1234'){
        res.status(200).render('index',{
            name : "드래그 타입 2",
            data : db
            
        });
    }else{
        res.status(200).render('index',{
            name : "실패"
        });
    }
    console.log(req.user);
    
});

app.get('/drag_type_2',function(req,res){
    res.status(200).render('drag_type_2',{

    });
});


//존재하지 않은 라우터로 갔을때
app.use(function(req,res){
    res.render('404',{

    });
})


