var app = angular.module("cinema", ['ngRoute'])
app.controller("todoController", ['$scope', function ($scope) {
    var hd = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Nguyen Thanh Thien 658JJH'
    });


    if (getCookie("userid")) {
        $.get('/user', { id: getCookie('userid') }, function (res) {
            console.log("Get user status : " + res.status);
            if (res.status == 200) {
                showUser();
                document.getElementById('nameusercurrent').innerText = res.userName;
            } else {
                console.log("Can not get");
            }
        })
    } else {
        console.log("Did not login !");
        hideUploadFilm();
    }


}]);
// -----------   TOGGLE INPUT SEARCH --------------

function toggleInputSearch() {
    $('#inputsearch').animate({ width: 'toggle' }, 300);
}


function hideSearch() {
    $('#formSearch').attr('style', 'display:none');
}

function hideLogin() {
    $('#tabLogin').attr('style', 'display:none');
}

function hideUploadFilm() {
    $('#tabUpload').attr('style', 'display:none');
}

function showRegister() {
    $('#tabRegister').attr('style', 'display: block');
}

function showUser() {
    document.getElementById('tabloginShow').style = "display: block";
    document.getElementById('tabloginShow2').style = "display: block";
    hideLogin();
}

function goBack() {
    window.history.back();
}

function goLogin() {
    window.location.href = '/login';
}

function goProfile() {
    window.location.href = '/profile';
}

function goUpload() {
    window.location.href = '/upfilm';
}

function showAlertAndGo(title, url) {
    swal(title, "", "success", {
        button: "OK",
    }).then((value) => {
        window.location.href = url
    });
}

function showErrGoHome(title) {
    swal(title, "", "error", {
        button: "OK",
    }).then((value) => {
        window.location.href = '/'
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function removeCookie() {
    document.cookie = "userid=";
    document.cookie = "userid=; path=/profile";
    document.cookie = "userid=; path=/";
}

function logOut() {
    swal("Are you sure you want to logout ?", {
        buttons: {
            cancel: "Canel",
            OK: true,
        },
    })
        .then((value) => {
            switch (value) {
                case "OK":
                    removeCookie();
                    window.location.href = '/';
                    break;
                case "Canel":
                    break;
            }
        });
}
