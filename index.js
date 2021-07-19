const http = require('http');
const express = require("express");
const app = express();
const hbs = require('express-handlebars');
const path = require('path');


/*js*/
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




app.get('/', function (req, res) {
    res.status(200).render('index',{
        name : "드래그 타입 2"
    });
});

app.listen(3000, () => {
    //console.log(`Server is running on ${3000} port`);
});