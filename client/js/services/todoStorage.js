/*
    factory() 함수로 todomvcStorage라는 이름의 앵귤러 서비스를 정의했다.
    서비스는 싱글톤이라 todomvc 모듈 내에서는 하나의 객체만 생성된다.

    임시로 간단히 정의했지만, todos가 실제로 데이터베이스 역할을 하고,
    get / post / delete / update 함수를 통해 데이터 접근이 이뤄진다.
*/
app.factory('todomvcStorage', function() {
    const storage = {
        todos: [
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
        ],

        // Read
        get: function() {
            return storage.todos;
        },

        // Create
        post: function(todoTitle) {
            /* 
                첫 데이터라면 id는 1부터 시작.
                아니라면, 테이블의 맨 마지막에 존재하는 id에 1 증가 시킨 값을 지정한다.
            */
            const newId = !storage.todos.length ? 1 : storage.todos[storage.todos.length - 1].id + 1;
    
            const newTodo = {
                id: newId,
                title: todoTitle,
                completed: false
            };
    
            storage.todos.push(newTodo);
        },

        // Delete
        delete: function(id) {
            // 배열에서 제거할 대상 인덱스를 검색
            var deletedTodoIdx = storage.todos.findIndex(function(todo) {
                return todo.id === id;
            });
    
            if(deletedTodoIdx === -1) return;
    
            // 배열에서 제거
            storage.todos.splice(deletedTodoIdx, 1);
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