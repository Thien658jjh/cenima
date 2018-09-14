module.exports = (() => {
    uploadRoute = {}

    uploadRoute.uploadImage = (req, res) => {
        console.log(req);
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let fileInput = req.files.fileInput,
            name = './pictures/' + (Date.now + 1)

        // Use the mv() method to place the file somewhere on your server
        fileInput.mv(name, function (err) {
            if (err)
                return res.status(500).send(err);
            res.send('File uploaded!');
        });
        res.status(200).json({ name: name })
    }

    uploadRoute.uploads = (req, res) => {
        res.send({ ok: "sai nữa đi" })
    }

    return uploadRoute
})()
