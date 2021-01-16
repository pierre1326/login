var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var mongoUri = 'mongodb+srv://miranda:miranda@cluster.jglnb.mongodb.net/proyecto?retryWrites=true&w=majority'

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

var user = new mongoose.Schema({
  user: String,
  password: String
})

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/login', (req, res) => {
  const body = req.body
  var users = mongoose.model('user', user)
  users.find({user: body.user, password: body.password}, (err, result) => {
    if(err) {
      res.status(200).json({status: 'Failed', error: error})
    }
    else if(Object.keys(result).length) {
      res.status(200).json({status: 'Success'})
    }
    else {
      res.status(200).json({status: 'Failed'})
    }
  })
})

app.post('/createUser', (req, res) => {
  const body = req.body
  var newUser = mongoose.model('user', user)
  newUser.create({
    user: body.user,
    password: body.password
  }, (err, client) => {
    if(err) {
      res.status(200).json({status: 'Failed', error: error})
    }
    else {
      res.status(200).json({status: 'Success', client: client})
    }  
  })
})

app.listen(PORT, () => {
  console.log('Servidor funcionando en puerto: ' + PORT)
})