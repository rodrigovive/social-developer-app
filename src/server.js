const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
// DB Config
const db = require('./config/keys').mongoURI
const routerApi = require('./api/router');

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api',routerApi)

mongoose.connect(db)
.then(() => console.log('MONGODB CONNECTED'))
.catch(err => console.log(err))


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

