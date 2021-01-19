/* 
    콜백 함수의 두 번째 인자로 todomvcStorage 서비스를 주입했다.
    이로써 이 로직 안에서 서비스를 호출할 수 있게 되었다.
*/
app.controller('TodomvcCtrl', function($scope, todomvcStorage) {
    /* Variables */
    
    /* 
        todomvcStorage 서비스를 주입하고 기존 $scope.todos에 설정했던 배열을 제거했다.
        대신 서비스에서 정의한 get() 함수를 통해 todo 목록 데이터를 가져온다.
    */
    $scope.todos;

    // Status Info
    $scope.status = '';

    // Filter Info
    $scope.statusFilter = {};


    /* Functions */

    /* 
        Read Function.
        기존에는 서비스에 있는 데이터를 바로 받았다.
        동기식 코드이기 때문이다.
        그러나 ajax 요청을 하는 서비스는 비동기 로직이므로 콜백함수를 파라미터로 넘겼다.

        보통 콜백함수는 두 개의 파라미터를 사용하도록 구현한다.
        첫 번째는 에러, 둘째는 성공 시 응답이다.
        그래서 콜백 함수 결과를 확인할 때, 
        에러를 체크한 뒤 성공 응답을 확인하는 것이 일반적이다.

        참고로 아래는 함수의 정의가 아닌,
        단순한 함수 호출문이다!
    */
    todomvcStorage.get(function(err, todos) {
        if(err) return;

        $scope.todos = todos;
    });

    // callback function for Rest API
    $scope.apiCallBack = function(err, todos) {
        if(err) return;

        $scope.todos = todos;
    }

    // Create Function
    $scope.addTodo = function(todoTitle) {
        // 문자열의 양 끝 공백 제거!
        todoTitle = todoTitle.trim();

        // User 단에서 입력 내용 없이 post 요청을 보냈다면 무효 처리!
        if(!todoTitle) return;

        // Post(Create) 서비스 호출!
        todomvcStorage.post(todoTitle, $scope.apiCallBack);
    }

    // Delete Function
    $scope.remove = function(id) {
        // User 단에서 삭제를 위해 클릭한 todo가 유효하지 않은 경우!
        if(!id) return;

        // Delete 서비스 호출!
        todomvcStorage.delete(id, $scope.apiCallBack);
    }

    // 완료 체크된 모든 todo 제거
    $scope.clearCompleted = () => {
        todomvcStorage.deleteCompleted();
    }


    /*
        $watch

        앵귤러에서 가장 많이 사용하지만, 남용되어서는 안 될 함수가 있는데 바로 $watch 함수다.
        이것은 스코프 변수의 변경을 감지하고 그때마다 사용자가 설정한 함수를 실행한다.
        물론, 많이 사용하면 메모리 자원도 그만큼 많이 사용하기 때문에 조심해야 한다.

        $watch 변수를 통해 버튼 클릭으로 변경되는 status 변수를 감시하고 그 값에 따라 statusFilter 값을 변경해주면 필터가 동작한다.
        필터버튼을 클릭하고 status 값이 변경되면 $watch()에 등록한 함수가 동작한다.
    */
    $scope.$watch("status", function() {
        if($scope.status === "completed"){
            // Completed 버튼 클릭 시
            $scope.statusFilter = { completed: true };  // 필터를 설정한다.
        } else if($scope.status === "active") {
            // Active 버튼 클릭 시
            $scope.statusFilter = { completed: false }; // 필터를 설정한다.
        } else {
            // All 버튼 클릭 시
            $scope.statusFilter = { }    // 필터를 해제한다.
        }
    });
});