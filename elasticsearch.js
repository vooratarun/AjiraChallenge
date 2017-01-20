/*
*  This file fetches data from elasticSearch Database
* */

var HOST = "http://127.0.0.1:9200";
var INDEX_NAME = "form_index";
var TYPE_NAME = "form_type";

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: HOST
    // log: 'trace'
});

function runQuery(query, callback) {
    client.search(query).then(function (resp) {
        var hits = resp.hits.hits;
        callback && callback(hits,null);
    }, function (err) {
        callback && callback(null,err);
    });
}

function insertForm(obj,id,cb){
    console.log(obj);
    client.index({
        index: INDEX_NAME,
        type: TYPE_NAME,
        body: obj,
        id:id,
    },function(resp){
        cb && cb("one doc inserted")
    },function(err){

    })
}

function formsCount(callback){
    var dbQuery = {
        index: INDEX_NAME,
        type: TYPE_NAME,
        body :{
            "query" :{
                "match_all" : {	}
            },
            "sort" : [
                { "_id" : {"order" : "desc"} }
            ]
        }

    };
    client.search(dbQuery).
        then(function(resp){
            var id = resp.hits.hits[0]["_id"];
            callback(parseInt(id));
        },function(err){

    });

}

function getAllForms(cb){

    var dbQuery = {
        index: INDEX_NAME,
        type: TYPE_NAME,
        body :{
            "query" :{
                "match_all" : {	}
            }
        }
    };
    client.search(dbQuery).
        then(function(resp){
            var respArray = [];
            for(var i=0;i<resp.hits.hits.length;i++) {
                var obj = {};
                var id = resp.hits.hits[i]["_id"];
                var formName = resp.hits.hits[i]["_source"]["formName"];
                obj["id"] = id;
                obj["formName"] = formName;
                respArray.push(obj);
            }
            cb && cb(respArray);
        },function(err){
        });
}

function getFormById(id ,cb){
    var dbQuery = {
        index: INDEX_NAME,
        type: TYPE_NAME,
        body :{
            "query" :{
                "match_phrase" : { "_id" : id	}
            },
            "size" : 1
        }
    };
    client.search(dbQuery).
        then(function(resp){
            cb && cb(resp.hits.hits[0]["_source"]);
        },function(err){
    });
}


module.exports = {
    runQuery:runQuery,
    insertForm:insertForm,
    formsCount:formsCount,
    getAllForms:getAllForms,
    getFormById:getFormById
};