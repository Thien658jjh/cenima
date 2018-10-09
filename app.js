// Set timezone: Asia
process.env.TZ = 'Asia/Ho_Chi_Minh'

var express = require('express'),
  config_mog = require('./config/config').CONFIG_MONGO,
  config = require('./config/apiConfig').CONFIG_API,
  port = process.env.PORT || config.__port_server,
  app = express(),
  // session = require('express-session'),
  path = require('path'),
  html = require('express-handlebars'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  fileUpload = require('express-fileupload')

// Config mongoose
mongoose.Promise = global.Promise
mongoose.connect(config_mog.__MONGO_LINK)

// Session
// app.use(session({
//   secret: '2C44-4D44-WppQ38S',
//   resave: true,
//   saveUninitialized: true
// }));

app.use(fileUpload());

// Config template views
app.engine('html', html({
  extname: 'html',
  defaultLayout: 'template-layout',
  layoutsDir: __dirname + '/view/'
}))
app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'html')

// Config body parser json
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// Config Public folder
app.use(express.static(path.join(__dirname, 'publics')))

// Model config
var categoryModel = require("./models/categoryModel"),
  filmModel = require('./models/filmModel'),
  userModel = require('./models/userModel'),

  appModel2 = require('./model/appModel'), // App model
  userModel2 = require('./model/userModel'), // App model
  storyModel2 = require('./model/storyModel'), // App model
  storyModel2 = require('./model/funnyStoryModel'), // App model
  vocabModel2 = require('./model/vocabModel'), // App model
  idiomModel2 = require('./model/idiomModel')

// Route config
var adminRoute = require('./routes/adminRoute')(app),
  categoryRoute = require('./routes/categoryRoute')(app),
  filmRoute = require('./routes/filmRoute')(app),
  userRoute = require('./routes/userRoute')(app),
  home = require('./routes/appRoute')(app),
  uploadRoute = require('./routes/uploadRoute')(app),
  infoUserRoute = require('./routes/infoUserRoute')(app),

  appRoute = require('./route/appRoute')(app),
  userRoute2 = require('./route/userRoute')(app),
  storyRoute = require('./route/storyRoute')(app)

app.listen(port)

console.log('App has been connected from port: ' + port)