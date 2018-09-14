module.exports = (app) => {
    var filmController = require('../controllers/filmController'),
        config = require('../config/config').CONFIG_API,
        appController = require('../controllers/appController'),
        filmModel = mongoose.model('filmModel'),
        func = require('../controllers/function').function

    // Route get, post, put...
    app.route('/' + config.__link_film)
        .post(filmController.createFilm)

    app.route('/film/delete')
        .get(filmController.deleteFilm)

    app.route('/film/edit')
        .get(appController.editFilm)

    app.route('/film/')
        .get(filmController.getAllFilm)
    // .post(filmController.createFilm)

    app.route('/film/detail')
        .get(filmController.getFilm)


    app.post('/film', function (req, res) {
        var name = ""
        if (!func.isEmpty(req.body)) {
            if (req.files.fileInput) {
                var fileInput = req.files.fileInput;
                name = new Date().getTime() + fileInput.name
                fileInput.mv(__dirname + "/../public/images/upfile/" + name, function (err) {
                    if (err) {
                        console.log("Upload Image failed !");
                        return res.status(200).send(err);
                    }
                    else {
                        new filmModel({
                            ownerId: req.body._id,
                            filmName: req.body.filmName,
                            categoryName: req.body.categoryName,
                            month: req.body.filmMonth,
                            year: req.body.filmYear,
                            detail: req.body.filmContent,
                            photo: "/images/upfile/" + name
                        }).save((err, data) => {
                            if (err) {
                                res.status(200).json({ code: 400, message: "Create new film failed !" })
                            } else {
                                // res.status(200).json({ code: 200, message: "Create new film successfully !" })
                                res.redirect('/')
                            }
                        })
                    }
                });

            } else {
                res.status(200).json({ code: 400, message: "Please choose image" })
            }
        } else {
            res.status(200).json({ code: 400, message: "Create new film failed ! Body empty" })
        }
    })

    app.post('/film/edit', function (req, res) {
        var name = ""
        if (!func.isEmpty(req.body)) {
            if (req.files) {
                var fileInput = req.files.fileInput;
                name = new Date().getTime() + fileInput.name
                fileInput.mv(__dirname + "/../public/images/upfile/" + name, function (err) {
                    if (err) {
                        console.log("Upload Image failed !");
                        return res.status(200).send(err);
                    }
                    else {
                        filmModel.findByIdAndUpdate({
                            _id: req.body.id
                        }, {
                                filmName: req.body.filmName,
                                categoryName: req.body.categoryName,
                                month: req.body.filmMonth,
                                year: req.body.filmYear,
                                detail: req.body.filmContent,
                                photo: "/images/upfile/" + name,
                                timeModified: Date.now()
                            }, {
                                upsert: true,
                                new: true
                            }).exec((err, new_film) => {
                                // res.status(200).json({ code: 200, message: 'Update film completetely !' })
                                res.redirect('/')
                            })
                    }
                });

            } else {
                filmModel.findByIdAndUpdate({
                    _id: req.body.id
                }, {
                        filmName: req.body.filmName,
                        categoryName: req.body.categoryName,
                        month: req.body.filmMonth,
                        year: req.body.filmYear,
                        detail: req.body.filmContent,
                        timeModified: Date.now()
                    }, {
                        upsert: true,
                        new: true
                    }).exec((err, new_film) => {
                        // res.status(200).json({ code: 200, message: 'Update film completetely !' })
                        res.redirect('/')
                    })
            }
        } else {
            res.status(200).json({ code: 400, message: "Create new film failed ! Body empty" })
        }
    })

}