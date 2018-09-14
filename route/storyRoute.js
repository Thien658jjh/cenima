module.exports = (app) => {
    let storyController = require('../controllerss/storyController'),
        config = require('../config/apiConfig').CONFIG_API

    app.route('/' + config.__link_story)
        .get(storyController.getStory)
        .post(storyController.createNewStory)
        .delete(storyController.deleteStory)

    app.route('/' + config.__link_story + 'del')
        .delete(storyController.deleteAllStory)

}