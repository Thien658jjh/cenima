var app = angular.module("story", ["ngRoute"])
app.controller("upFunnyStoryController", function ($scope) {

    $scope.listGenreFilms = [
        'Animal Stories',
        'Witty Tales',
        'Moral Stories',
        'Humorous Stories',
        'Zen Tales',
        'Raman Stories',
        'Mulla Stories',
        'Aesop’s fables',
        'Jataka Tales',
        'Birbal Stories',
        'Modern Stories',
        'Classics',
        'Fables',
        'Mythological Stories',
        'Stories of African Origin',
        'Stories of Chinese Origin',
        'Others'
    ];

    $scope.upfunnystory = function () {

        var storyTime = Date.now().toString();
        var category = $scope.categoryName;
        if (!category) {
            category = "Fables"
        }
        $.post("api/v1.0/funnystory", {
            keyupload: $scope.keyupload,
            category: category,
            storyName: $scope.storyName,
            storyOriginal: $scope.storyOriginal,
            storyTime: storyTime
        }, function (res) {
            if (res.code == 200) {
                swal("Thành công").then(value => {
                    window.location.href = "";
                })
            }
        })
    }
})