var app = angular.module("cinema");

app.controller("profileController", ['$scope', function ($scope) {

    hideSearch();
    hideUploadFilm();
    // Login 
    $.get('/user', { id: getCookie('userid') }, function (res) {
        if (res.status == 200) {
            document.getElementById('email').value = res.email
            document.getElementById('username').value = res.userName
            document.getElementById('imageAvatar').src = res.photo
            document.getElementById('phone').value = res.phone
            document.getElementById('_id').value = res._id
        } else {
            console.log("Can not get");

        }
    })

    $scope.clickUploadImage = function () {
        document.getElementById('fileInputAvatar').click();
    }


}])

function goToProfile() {
    window.location.href = "/profile/changepass"
}
function readURLImg(input) {
    console.log(input);
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log(e);
            $('#imageAvatar').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}