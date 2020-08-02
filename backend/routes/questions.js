var express = require("express");
var router = express.Router();
var mongo = require("mongodb");
const { get } = require(".");
var MongoClient = mongo.MongoClient;

var domain = "127.0.0.1";
var port = 27017;
var dbName = "test";
var destinationNode = "mongodb://" + domain + ":" + port;

router.use(function (req, res, next) {
  console.log("/questions" + req.url, "@", Date.now());
  next();
});

router
  .route("/")
  .get((req, res) => {
    MongoClient.connect(
      destinationNode,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, client) {
        // Retrieving the collection questions from MongoDB test
        var db = client.db(dbName);
        var questions = db.collection("questions");
        var questionBank = db.collection("questionBank");

        var questionList = [];
        questions
          .find()
          .sort({ _id: 1 })
          .forEach((doc) => {
            questionBank.findOne({ number: doc._id }, function (error, result) {
              if (error) {
                console.log(error);
              }
              questionList.push(result);
            });
          });

        res.send("hi");
      }
    );
  })
  .post((req, res) => {
    MongoClient.connect(
      destinationNode,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, client) {
        // Retrieving the collection questions from MongoDB test
        var db = client.db(dbName);
        var collection = db.collection("questions");

        // document to be inserted
        // test
        var question = req.body;
        var question_id = question._id;

        // inserting document to 'questions collection' using insertOne
        // var cursor = collection.insertOne(doc, function (err, res) {
        collection.updateOne(
          { _id: question_id },
          { $set: question },
          { upsert: true },
          function (err) {
            if (err) {
              res.send({ updated: false });
            } else {
              res.send({ updated: true });
            }
            client.close();
          }
        );
      }
    );
  });

router.route("/attempted/:questionid").get((req, res) => {
  MongoClient.connect(
    destinationNode,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, client) {
      // Retrieving the collection questions from MongoDB test
      var db = client.db(dbName);
      var collection = db.collection("questions");

      collection.findOne({ _id: Number(req.params.questionid) }, function (
        err,
        result
      ) {
        if (err) {
          console.log(err);
        } else {
          // send the question back to client
          res.send(result);
        }
        client.close();
      });
    }
  );
});

router.route("/questionBank/").get((req, res) => {
  MongoClient.connect(
    destinationNode,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, client) {
      // Retrieving the collection questions from MongoDB test
      var db = client.db(dbName);
      var myquestions = db.collection("questionBank");
      myquestions.find({}).toArray(function (err, docs) {
        if (err) return res.status(500).send({ error: err });
        res.send(docs);
      });
    }
  );
});

router.route("/questionBank/:questionid").get((req, res) => {
  MongoClient.connect(
    destinationNode,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, client) {
      // Retrieving the collection questions from MongoDB test
      var db = client.db(dbName);
      var collection = db.collection("questionBank");

      collection.findOne({ number: Number(req.params.questionid) }, function (
        err,
        result
      ) {
        if (err) {
          console.log(err);
        } else {
          // send the question back to client
          res.send(result);
        }
        client.close();
      });
    }
  );
});

module.exports = router;
