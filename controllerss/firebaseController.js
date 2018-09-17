var firebase = require('firebase-admin'),
    serviceAccount = require('../songnguav_firebase.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://songnguav.firebaseio.com'
});

let db = {
    newStory: (story, res) => {
        var ref = firebase.database().ref('Data');
        var storyRef = ref.child('Story');
        var key = storyRef.push().key;
        story.id = key;

        storyRef.push(story, res);
    }
}
exports.function = db