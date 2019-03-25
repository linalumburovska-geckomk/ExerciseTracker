
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
const user = require('./models/user')
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cors({optionSuccessStatus: 200})); 
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tracker');

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.post('/api/exercise/new-user', function(req,res){
    var data = new user({
        "username": req.body.username
    })  
    data.save(err => {
        if(err){
            return res.send('Error');
        }
    })
    return res.json(data);
})

app.get('/api/exercise/users', function(req,res){
    user.find().exec(function(error,data) {
        return res.json(data);
    })
})

app.post('/api/exercise/add', function(req,res){
    var id = req.body.userId;
    user.findById(id).exec(function(error,data){
        data.description = req.body.description;
        data.duration = req.body.duration;
        if(req.body.date==''){
            data.date = Date.now();
        } else {
            data.date = req.body.date;
        }
        data.save(err => {
            if(err){
                return res.send('Error');
            }
        })
        return res.json(data);
    })
})

app.get('/api/exercise/log/:userId', function(req,res){
    var id = req.params.userId;
    user.findById(id).exec(function(error,data){
        return res.json(data);
    })
})

app.get('/api/exercise/log/:userId/:from/:to/:limit', function(req,res){
    var from = req.params.from;
    var to = req.params.to;
    var limit = req.params.limit;
    var id = req.params.userId;
    user.findById(id).exec(function(error,data){

        from = new Date(from);
        to = new Date(to);

        data.fromToDate = new Date(to - from);
        data.limitOptions = limit;    
        data.save();
        return res.json(data);
    })
})

app.listen(3000, function () {
  console.log('Your app is listening on port 3000');
});