var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

var domain = '127.0.0.1';
var port = 27017;
var dbName = "test";
var destinationNode = "mongodb://" + domain + ":" + port;

router.get('/', function(req, res, next) {
  var documents = [];
  MongoClient.connect(destinationNode, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection('questions');

    var cursor = collection.find().sort({"_id": 1})
    cursor.forEach(function(doc, err) {
      documents.push(doc);
    }, function() {
      client.close();
      console.log(documents);
      res.render('questions', {name: 'Fabio'})
    })
  })
})

module.exports = router;
