var firebase = require('firebase-admin'),
    uniqid = require('uniqid'),
    serviceAccount = require('../songnguav_firebase.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://songnguav.firebaseio.com'
});

let db = {
    newStory: (story, res) => {
        var ref = firebase.database().ref('Data');
        var storyRef = ref.child('Story');
        var storyFLRef = ref.child('StoryForList');

        story._id = uniqid();

        storyRef.push(story, res)
            .then((snap) => {
                storyFLRef.child(snap.key).set({
                    storyName: story.storyName,
                    storyNumber: story.storyNumber,
                    storyTime: story.storyTime
                })
            });
    },

    newFunnyStory: (storyFunny, res) =>{
        var ref = firebase.database().ref('Data');
        var storyRef = ref.child('StoryFunny');
        storyRef.push(storyFunny, res);
    },

    backup: (stories) => {
        var ref = firebase.database().ref('Data');
        var storyRef = ref.child('Story');
        var storyFLRef = ref.child('StoryForList');

        stories.sort(function (a, b) {
            return a.storyNumber - b.storyNumber;
        });

        stories.forEach(story => {
            storyRef.push(story)
             .then((snap) => {
                    storyFLRef.child(snap.key).set({
                        storyName: story.storyName,
                        storyNumber: story.storyNumber + "",
                        storyTime: story.storyTime
                    })
                })
        })
    },

    newQuotation: (quotation) => {
        var ref = firebase.database().ref('Data').child('Quotation');
        var ref1 = ref.child('Data');
        var ref2 = ref.child('Today');

        ref1.push(quotation);
        ref2.set(quotation)
    }
}
exports.function = db