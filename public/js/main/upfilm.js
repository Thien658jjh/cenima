var app = angular.module("cinema")
app.controller("upFilmController", ['$scope', function ($scope) {

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

    $scope.categoryName = $scope.listGenreFilms[0]
    $scope._id = getCookie('userid')

    $scope.listMonth = []
    for (var i = 1; i <= 12; i++) $scope.listMonth.push('Tháng ' + i)
    $scope.listYear = [];
    for (var i = 1900; i <= 2050; i++) $scope.listYear.push('Năm ' + i)

    $scope.filmMonth = 'Tháng ' + (new Date().getMonth() + 1)
    $scope.filmYear = 'Năm ' + new Date().getFullYear()


    document.getElementById('fileInput').addEventListener('change', function (e) {
        filePicked = e.target.files[0];
    }, false);


    $scope.clickUploadFilm = function () {
        if (document.getElementById('filmName').value.length < 5 ||
            document.getElementById('filmName').value.length > 50) {
            document.getElementById('filmName').setCustomValidity('Tên bộ phim từ 5-50 ký tự');
            return
        }
        document.getElementById('filmName').setCustomValidity('');

        if (document.getElementById('filmContent').value.length < 10) {
            document.getElementById('filmContent').setCustomValidity('Mô tả bộ phim tối thiểu 10 ký tự');
            return
        }
        document.getElementById('filmContent').setCustomValidity('');

        if (filePicked === null) {
            swal('Bạn chưa chọn ảnh minh họa phim');
            return
        } else {
            $.post("/film/", {
                filmName: $scope.filmName,
                categoryName: $scope.filmGenre,
                year: year,
                detail: $scope.filmContent
            }, function (res) {
                if (res.code == 200) {
                    showAlertAndGo(res.message, "/")
                } else {
                    swal(res.message)
                }
            })
        }

    }

    $scope.clickUploadImage = function () {
        document.getElementById('fileInput').click();
    }

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