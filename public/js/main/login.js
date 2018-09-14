var app = angular.module("cinema");


app.controller("loginController", ['$scope', function ($scope) {
    hideSearch();
    hideUploadFilm();
    showRegister();
    hideLogin();

    if (getCookie("rp")) {
        $scope.email = window.atob(getCookie("pre"))
        $scope.password = window.atob(getCookie("prp"))
        $scope.rememberPassword = true
    }

    // Login 
    $scope.clickLogins = function () {

        if (document.getElementById('email').value.length < 1) {
            document.getElementById('email').setCustomValidity('Vui lòng nhập Email');
            return;
        }
        document.getElementById('email').setCustomValidity('');

        if (document.getElementById('password').value.length < 1) {
            document.getElementById('password').setCustomValidity('Vui lòng nhập mật khẩu');
            return;
        }
        document.getElementById('password').setCustomValidity('');

        if ($scope.rememberPassword) {
            document.cookie = "rp=" + true;
            document.cookie = "pre=" + window.btoa($scope.email);
            document.cookie = "prp=" + window.btoa($scope.password);
        } else {
            document.cookie = "rp=" + false;
            document.cookie = "pre=";
            document.cookie = "prp=";
        }

        $.post("/login/", {
            email: $scope.email,
            password: $scope.password
        }, function (res) {
            if (res.code == 200) {
                showAlertAndGo(res.message, "/")
                document.cookie = "userid=" + res._id+"; path=/";
                document.cookie = "userid=" + res._id+"; path=/profile";
            } else {
                swal(res.message)
            }
        })
    }

}])