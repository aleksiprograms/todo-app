/*
A frontend controller for the todo app to:
-get tasks from the server
-post a new task to the server
-delete a existing task from the server
-update a existing task in the server
-manage, when to show the new task form or the edit task form
*/

let app = angular.module('app', []);
app.controller('controller', function($scope, $http) {

  $scope.newTaskFormShown = false;
  $scope.editTaskFormShown = false;

  let getAllTasks = function() {
    $http.get('/tasks').then(function(response) {
      $scope.tasks = response.data;
    });
  };

  getAllTasks();

  $scope.postTask = function() {
    $scope.newTaskFormShown = false;
    $http.post('/tasks', $scope.newTask).then(function(response) {
      $scope.newTask = {};
      getAllTasks();
    });
  };

  $scope.deleteTask = function() {
    $scope.editTaskFormShown = false;
    $http.delete('/tasks/' + $scope.editTask._id).then(function(response) {
      getAllTasks();
    });
  };

  $scope.putTask = function() {
    $scope.editTaskFormShown = false;
    $http.put('/tasks/' + $scope.editTask._id, $scope.editTask).then(function(response) {
      getAllTasks();
    });
  };

  $scope.showEditTaskForm = function(task) {
    $scope.editTaskFormShown = true;
    $scope.editTask = task;
  };

  $scope.showNewTaskForm = function() {
    $scope.newTaskFormShown = true;
  };

  $scope.hideNewTaskForm = function() {
    $scope.newTaskFormShown = false;
  };
});
