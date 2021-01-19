const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

/* 
    앵귤러 서비스쪽에 있던 배열을 노드 서버 코드로 옮겼다.
    앵귤러 서비스는 데이터를 가지고 있으면 안된다.
    사용자의 브라우져에 있는 것이기 때문에, 민감한 정보라면 서버에서 관리해야 한다.
    이전 버전에서는 서버 개발 전이기 때문에 그냥 그렇게 진행했지만, 이번에는 서버로 이 데이터를 가져온 것이다.

    그럼 기존의 앵귤러 서비스는 어떤 역할을 하게 될까?
    백엔드 서버 API를 이용해 데이터를 요청하는 기능을 하게될 것이다.
    이젠 앵귤러 서비스의 데이터 관리를 백엔드로 위임한다고 보면 된다.
*/
const todos = [
    {
        id: 1,
        title: 'AngularJS 공부하기',
        completed: false
    }, 
    {
        id: 2,
        title: 'ROS 개념잡기',
        completed: true
    },
    {
        id: 3,
        title: 'NodeJS 공부하기',
        completed: true
    }
];

/* 
    이전 커밋 버전에서 만들었던 우리 사이트의 홈페이지로 접속하면 angular로 만들었던 index.html 페이지가 로딩되는 것이 자연스럽다.
    결국은 서버에 있는 프론트엔드 코드들이 브라우저로 다운로드 되어야 하는데,
    이러한 파일들을 우리는 정적파일(Static Files)이라고 부르고 express.js는 그러한 기능을 제공한다.
*/
app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// 미들웨어에 body parser 추가
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET /ap/todos 라우팅 설정
app.get('/api/todos', (req, res) => {
    res.json({ todos });
});


// POST /api/todo 라우팅 설정
app.post('/api/todo', (req, res) => {
    if(!req.body.title){
        return res.status(400).send();
    }

    /* 
        첫 데이터라면 id는 1부터 시작.
        아니라면, 테이블의 맨 마지막에 존재하는 id에 1 증가 시킨 값을 지정한다.
    */      
    const newId = !todos.length ? 1 : todos[todos.length - 1].id + 1;

    const newTodo = {
        id: newId,
        title: req.body.title,
        completed: false
    };

    todos.push(newTodo);

    res.json({ newTodo });
});


// DELETE /api/todo/:id 라우팅 설정
app.delete('/api/todo/:id', (req, res) => {
    const deletedId = parseInt(req.params.id);
    
    if(!deletedId){
        return res.status(400).send();
    }
 
    // 배열에서 제거할 대상 인덱스를 검색
    const deletedTodoIdx = todos.findIndex(function(todo) {
        return todo.id === deletedId;
    });

    if(deletedTodoIdx === -1) {
        return res.status(400).send();
    }

    // 배열에서 제거
    todos.splice(deletedTodoIdx, 1);

    // 제거된 todo의 index를 반환한다.
    res.json({ deletedTodoIdx });
});


app.get('/', (req, res) => {
    res.sendfile('index.html');
});

app.listen(port, () => {
    console.log(`Example app is listening on port ${port}`);
});