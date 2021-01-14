/*
    디렉티브를 정의할 때, scope 객체에 사용할 스코프 변수를 설정할 수 있다.
    todo는 데이터인데 출력뿐만 아니라 수정도 해야하기 때문에 양방향 바인딩 '='을 사용했다.
    remove는 이벤트 핸들러 함수이므로 참고용 '&'으로 사용했다.

    이렇게 todo-item 디렉티브를 사용하면 인덱스 파일을 훨씬 간단하게 만들 수 있다.
    이 태그를 삽입하면 되기 때문이다.

    ng-click="remove(todo)"으로 명시해 주는 이유 추후 생각해보기
*/
app.directive("todoItem", function() {
    return {
        restrict: "E",
        scope: {
            // 디렉티브 스코프 설정
            todo: "=",      // 양방향 바인딩
            remove: "&"     // 참고 바인딩. 함수 설정시 주로 사용함
        },
        template: 
        '<div class="input-group">' +
        '<span class="input-group-addon">' +
        '<input type="checkbox" ng-model="todo.completed" aria-label="..."/>' +
        '</span>' +
        '<input type="text" ng-model="todo.title" aria-label="..." class="form-control"/>' +
        '<div class="input-group-btn">' +
        '<button type="button" ng-click="remove(todo)" class="btn btn-danger">삭제</button>' +
        '</div>' +
        '</div>'
    };
});