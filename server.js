
var express =require('express');
var mongojs =require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser= require('body-parser');

var app =express();
app.use(express.static('public'));
app.use(bodyParser.json());

//serve get request to get  contact list from database 
app.get('/contactlist', function(req,res){
    console.log("I have received a request");
    db.contactlist.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});

// serve post request to insert new contact data to database
app.post('/contactlist',function(req,res){
    console.log(req.body); 
    db.contactlist.insert(req.body, function(err,doc){
        console.log(doc);
    });

});

//serve delete request to delete contact data with provided contact id from database 
app.delete('/contactlist/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

//serve get request to get contact data with provided contact id to edit it in input field 
app.get('/contactlist/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
        res.json(doc);
    });
});

// serve put request to update contact data of provided contact id
app.put('/contactlist/:id', function(req,res){
    var id =req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
     update: {$set: {name: req.body.name, email:req.body.email, number:req.body.number}},
        new:true}, function(err,doc){
            res.json(doc);
        });
});

app.listen(3000, function(){
    console.log("hey its listenning on port 3000")
});
