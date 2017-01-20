/*
* This is index server file.  All Apis for front-end were written here.
* Express Nodejs App
* */


var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var dbOps = require("./elasticsearch.js");
var fieldTypes = require('./fieldTypes.js');
var cors = require('cors');
app.use(cors());

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

app.use('/', express.static(__dirname + '/public/app/'));

// Textbox url
app.get("/create/textBox",function(req,res){
    res.send(fieldTypes.textBox);
});

app.get("/create/radioGroup",function(req,res){
    res.send(fieldTypes.RadioGroup);
});

app.get("/create/checkGroup",function(req,res){
    res.send(fieldTypes.checkGroup);
});

// inserting form to database.
app.post("/create/form",function(req,res){

    console.log("On post form");
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function (data) {
            jsonString += data;
        });
        req.on('end', function () {
            var data = JSON.parse(jsonString);
            var obj = data["form"];
            dbOps.formsCount(function(id){
                dbOps.insertForm(obj,id+1,function(result){
                    console.log("result sending ..",result);
                    res.send(result);
                });
            })

        });
    }
});

// show all forms ids in database
app.get("/show/forms/",function(req,res){
    console.log("on get all forms");
    dbOps.getAllForms(function(resp){
        res.send(resp);
    })
});

// show a formy by id.
app.get("/show/forms/:id",function(req,res){
    console.log("on getting single form");
    var id = parseInt(req.params.id);
    dbOps.getFormById(id,function(resp){
        res.send(resp);
    })
});

