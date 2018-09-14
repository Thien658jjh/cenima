var app = angular.module("cinema");

app.controller("profileChangePsController", ['$scope', function ($scope) {

    hideSearch();
    hideUploadFilm();
    // Login 

    if (getCookie('userid')) {
        $scope._id = getCookie('userid')
    } else {
        showErrGoHome("This page is not available now !")
        return
    }

    $scope.changeNow = function () {
        if (document.getElementById('newpasscomfirm').value == document.getElementById('newpass').value) {
            $.post('/profile/changepass', {
                id: $scope._id,
                oldpass: $scope.oldpass,
                newpass: $scope.newpass
            }, function (res) {
                if (res.code == 200) {
                    showAlertAndGo(res.message, "/profile");
                } else {
                    swal(res.message)
                }
            })
        } else {
            swal("Password is not correct !")
        }
    }


}])
