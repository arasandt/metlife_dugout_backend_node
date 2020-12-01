const express = require("express")
const app = express()
const _ = require("lodash")
const userprofileRouter = require('./api/userprofile/userprofileRouter')
const { auth, signIn, signUp }  = require('./utils/auth');

// setup generic middlware for entire app
require('./middleware/setup')(app)

app.post('/nodeapi/signup', signUp)
app.post('/nodeapi/login', signIn)
app.use('/nodeapi/userprofile', auth, userprofileRouter)


// catch all errors when no route 
require('./middleware/error')(app)
module.exports = app    