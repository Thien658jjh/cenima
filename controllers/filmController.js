module.exports = (() => {
    var func = require('./function').function,
        mongoose = require('mongoose'),
        filmModel = mongoose.model('filmModel'),
        filmRoute = {}

    filmRoute.createFilm = (req, res) => {

    }

    filmRoute.getAllFilm = (req, res) => {
        filmModel.find({}, (err, result) => {
            if (!func.isEmpty(result)) {
                res.status(200).json({
                    code: 200,
                    films: result.reverse()
                })
            } else {
                res.status(200).json({ code: 404, message: 'Film is empty now !' })
            }
        })
    }

    filmRoute.getFilm = (req, res) => {
        filmModel.findOne({ _id: req.query.id }, (err, result) => {
            if (result) {
                res.status(200).json({ code: 200, film: result })
            } else {
                res.status(200).json({ code: 404, message: "Film not found !" })
            }
        })
    }

    filmRoute.deleteFilm = (req, res) => {
        filmModel.remove({ _id: req.query.id }, (err, result) => {
            if (result != undefined) {
                res.status(200).json({ code: 200, message: "Delete complete !" })
            } else {
                res.status(200).json({ code: 404, message: "Delete failed !" })
            }
        })
    }

    // Update information
    filmRoute.editFilm = (req, res) => {
        if (!func.isEmpty(req.body)) {
            filmModel.findByIdAndUpdate({
                _id: req.body.id
            }, {
                    filmName: req.body.filmName,
                    categoryName: req.body.categoryName,
                    month: req.body.month,
                    year: req.body.year,
                    detail: req.body.detail,
                    photo: req.body.photo,
                    timeModified: Date.now()
                }, {
                    upsert: true,
                    new: true
                }).exec((err, new_film) => {
                    res.status(200).json({ code: 200, message: 'Update film completetely !' })
                })

        } else {
            res.status(200).json({ code: 403, message: 'The request is understood, but it has been refused or access is not allowed' })
        }
    }

    return filmRoute

})()