const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

/* 
    이전 커밋 버전에서 만들었던 우리 사이트의 홈페이지로 접속하면 angular로 만들었던 index.html 페이지가 로딩되는 것이 자연스럽다.
    결국은 서버에 있는 프론트엔드 코드들이 브라우저로 다운로드 되어야 하는데,
    이러한 파일들을 우리는 정적파일(Static Files)이라고 부르고 express.js는 그러한 기능을 제공한다.
*/
app.use('/', express.static(path.join(__dirname, '../client')));

app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));


app.get('/', (req, res) => {
    res.sendfile('index.html');
});

app.listen(port, () => {
    console.log(`Example app is listening on port ${port}`);
});