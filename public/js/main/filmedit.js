var app = angular.module("cinema")
app.controller("upFilmEditController", ['$scope', function ($scope) {

    var photoUrl, filePicked

    hideLogin();
    hideSearch();
    hideUploadFilm();

    $scope.listGenreFilms = [
        'Tiểu sử lịch sử',
        'Lãng mạn tình cảm',
        'Khoa học viễn tưởng',
        'Huyền bí huyền ảo',
        'Phiêu lưu mạo hiểm',
        'Pháp luật hình sự',
        'Chiến tranh cổ trang',
        'Chiến tranh trung đại',
        'Chiến tranh hiện đại',
        'Kiếm hiệp, cổ trang',
        'Thuyết minh',
        'Hoạt hình',
        'Ma, kinh dị',
        'Kịch tính',
        'Hành động',
        'Sát nhân',
        'Thể thao',
        'Võ thuật',
        'Tâm lý',
        'Tội ác',
    ];

    $scope.listMonth = [];
    for (var i = 1; i <= 12; i++) $scope.listMonth.push('Tháng ' + i);
    $scope.listYear = [];
    for (var i = 1900; i <= 2050; i++) $scope.listYear.push('Năm ' + i);

    $scope.filmMonth = 'Tháng ' + (new Date().getMonth() + 1);
    $scope.filmYear = 'Năm ' + new Date().getFullYear();


    document.getElementById('fileInput').addEventListener('change', function (e) {
        filePicked = e.target.files[0];
    }, false);


    $scope.clickUploadImage = function () {
        document.getElementById('fileInput').click();
    }


    // Refill data info here =))
    var s = window.location.href,
        id = s.substr(s.indexOf('=') + 1, s.length);
    $.get('/film/detail', { id: id }, function (res) {
        console.log(res);

        if (res.code == 200) {
            $scope.id = id;
            $scope.filmName = res.film.filmName
            $scope.filmContent = res.film.detail
            document.getElementById('imageFilm').src = res.film.photo
            $scope.categoryName = res.film.categoryName.replace("string:", "")
            $scope.filmMonth = res.film.month.replace("string:", "")
            $scope.filmYear = res.film.year.replace("string:", "")
            $scope.$apply()
        } else {
            showErrGoHome(res.message);
        }

    })

}])

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imageFilm').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}