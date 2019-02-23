const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', indexRouter)
// app.use('/users', usersRouter)

app.listen(3000, () => console.log(`Started at PORT: ${3000}`))

module.exports = app
