var app = angular.module("cinema")

app.controller("filmDetailController", ['$scope', function ($scope) {

    hideSearch();
    var s = window.location.href,
        id = s.substr(s.indexOf('=') + 1, s.length);

    $.get('/film/detail', { id: id }, function (res) {
        console.log(res);

        if (res.code == 200) {
            document.getElementById('name').innerText = res.film.filmName
            document.getElementById('category').innerText = res.film.categoryName.replace("string:", "")
            document.getElementById('year').innerText = res.film.month.replace("string:Tháng ", "") + "/" +res.film.year.replace("string:Năm ", "")
            document.getElementById('detail').innerText = res.film.detail
            document.getElementById('image').src = res.film.photo

            if (res.film.ownerId == getCookie('userid')) {
                document.getElementById('delete').style = 'display: block; margin: 10px;'
                document.getElementById('edit').style = 'display: block; margin: 10px;'
            }
        } else {
            showErrGoHome(res.message);
        }

    })


    $scope.deleteFilm = function () {
        swal("Are you sure you want to delete this film ?", {
            buttons: {
                cancel: "Canel",
                OK: true,
            },
        })
            .then((value) => {
                switch (value) {
                    case "OK":
                        $.get('/film/delete', { id: id }, function (res) {
                            if (res.code == 200) {
                                showAlertAndGo(res.message, "/")
                            } else {
                                swal(res.message)
                            }
                        })
                        break;
                    case "Canel":
                        break;
                }
            });

    }

    $scope.editFilm = function () {
        window.location.href = '/film/edit?id=' + id
    }


}])