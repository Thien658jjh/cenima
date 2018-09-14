var app = angular.module("cinema");

app.controller("registerController", ['$scope', function ($scope) {

    hideSearch();
    hideUploadFilm();

    $scope.clickSignUp = function () {
        if (document.getElementById('username').value.length < 3 ||
            document.getElementById('username').value.length > 50) {
            document.getElementById('username').setCustomValidity('User name ít nhất 3 kí tự');
            return;
        }
        document.getElementById('username').setCustomValidity('');

        if (document.getElementById('emailSignUp').value.length < 3 ||
            document.getElementById('emailSignUp').value.indexOf('@') == -1 ||
            document.getElementById('emailSignUp').value.indexOf('.') == -1) {
            document.getElementById('emailSignUp').setCustomValidity('Email không hợp lệ');
            return;
        }
        document.getElementById('emailSignUp').setCustomValidity('');

        if (document.getElementById('password').value.length < 3) {
            document.getElementById('password').setCustomValidity('Mật khẩu tối thiểu 3 kí tự');
            return;
        }
        document.getElementById('password').setCustomValidity('');


        if (document.getElementById('password').value == document.getElementById('passwordConfirm').value) {
            $.post("/user/", {
                userName: $scope.userName,
                password: $scope.password,
                email: $scope.emailSignUp
            }, function (res) {
                console.log(res);
                if (res.code == 200) {
                    showAlertAndGo(res.message, "/")
                    document.cookie = "userid=" + res.user._id;
                } else {
                    swal(res.message)
                }
            })
        } else {
            swal("Password is not correct !")
        }

    }
}])