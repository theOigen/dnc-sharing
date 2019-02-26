const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const mongoose = require('mongoose');
const cloudinary = require("cloudinary");
const config = require("./config");
const passport = require('passport');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
require('./modules/socket')(io);

const publicPath = path.join(__dirname, 'public');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboyBodyParser({ limit: '15mb' }));
app.disable('etag');

require("./modules/passport");

// app.use('/', indexRouter)
// app.use('/users', usersRouter)

const connectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true
};
mongoose.connect(config.mongo_url, connectOptions)
    .then((x) => {
        console.log("Mongo database connected " + mongoose.connection);
        http.listen(config.port, function () { console.log(`Server is ready on port ${config.port}\n` + publicPath); });
    })
    .catch((err) => console.log("ERROR: " + err.message));

const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");


function enableCors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
}
app.use("/auth", enableCors, authRouter);
app.use("/api/v1", apiRouter);

module.exports = app;
