const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
require('dotenv').config() // protect those keys! npm install dontenv

// AWS Upload
// app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
//   bucket: process.env.AWS_S3_BUCKET, // required
//   region: process.env.AWS_S3_REGION, // optional
//   headers: {'Access-Control-Allow-Origin': '*'}, // optional
//   ACL: 'public-read', // this is the default - set to `public-read` to let anyone view uploads
//   }));

// Route includes
const userRouter = require('./routes/user.router');
const friendRouter = require('./routes/friend.router');
const courseRouter = require('./routes/course.router');
const friendCourseRouter = require('./routes/friend.course.router');
const userNameRouter = require('./routes/username.router');
const holeResultsRouter = require('./routes/hole.results.router');
const discGolfApi = require('./routes/disc.golf.api')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser())

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/friend', friendRouter);
app.use('/api/course', courseRouter);
app.use('/api/friendCourse', friendCourseRouter);
app.use('/api/username', userNameRouter);
app.use('/api/holeResults', holeResultsRouter);
app.use('/api/discGolfApi', discGolfApi)


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
