var app = angular.module("story", ["ngRoute"])
app.controller("quotationControlelr", function ($scope) {

    $scope.upquotation = function(){

        var key = Date.now().toString();
        $.post("api/v1.0/quotation", {
            content: $scope.content,
            author: $scope.author,
            key : key
        }).then(function(res) {

        })
    }
})