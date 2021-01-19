/*
    factory() 함수로 todomvcStorage라는 이름의 앵귤러 서비스를 정의했다.
    서비스는 싱글톤이라 todomvc 모듈 내에서는 하나의 객체만 생성된다.

    앵귤러 서비스는 백엔드 api와 http 통신하면서 데이터를 주고 받는 역할을 한다.
    그리고 컨트롤러에서는 이 서비스를 이용해 데이터를 가져와 템플릿에 뿌려주는 역할을 한다.

    다음의 계층 구조를 가진다.
    데이터베이스 -> 백엔드 api -> 앵귤러 서비스 -> 앵귤러 컨트롤러 -> 앵귤러 템플릿(뷰 단)
*/
app.factory('todomvcStorage', function($http) {
    const storage = {
        todos: [],

        /* 
            자바스크립트에서는 XMLHttpRequest 객체를 이용해 http 요청을 한다.
            제이쿼리는 $ajax 함수를 이용한다.
            마찬가지로 앵귤러도 ajax를 위한 서비스를 제공하는데,
            $http와 $resource가 있다.

            현 앵귤러 연습용 저장소에서는 기본적인 $http를 이용해 백엔드 api와 통신한다.
        */

        // Read
        get: function(callback) {
            $http.get('/api/todos')
            .then((res) => {
                callback(null, angular.copy(res.data.todos, storage.todos));
            })
            .catch((err) => {
                console.error(err);
                callback(err);
            });
        },

        /* 
            $http는 메소드에 따라 get(), post(), put(), delete() 함수를 제공한다.
            첫 번째 파라미터는 요청 url을 입력한다.
            post와 put 함수는 두 번째 파라미터로 요청 바디를 추가할 수 있다.
        */

        // Create
        post: function(todoTitle, callback) {
            $http.post('/api/todo', { title: todoTitle })
            .then((res) => {
                storage.todos.push(res.data.newTodo);
                callback(null, storage.todos);
            })
            .catch((err) => {
                console.error(err);
                callback(err);
            });
        },

        // Delete
        delete: function(id, callback) {
            $http.delete(`/api/todo/${id}`)
            .then((res) => {
                const deletedTodoIdx = res.data.deletedTodoIdx;

                // 현 스토리지 배열에서 제거
                storage.todos.splice(deletedTodoIdx, 1);
                callback(null, storage.todos);
            })
            .catch((err) => {
                console.error(err);
                callback(err);
            });
        },

        // 완료 체크된 모든 todo 제거
        deleteCompleted: function() {
            const incompletedTodos = storage.todos.filter((todo) => {
                return !todo.completed;
            });
    
            angular.copy(incompletedTodos, storage.todos);
        }
    }

    return storage;
});