var express = require("express");
var router = express.Router();
var mongo = require("mongodb");
const { get } = require(".");
var MongoClient = mongo.MongoClient;
const secrets = require("../secrets");

var dbName = secrets.dbName;
var destinationNode = secrets.mongodb;

router.use(function (req, res, next) {
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

        questions
          .aggregate([
            {
              $lookup: {
                from: "questionBank",
                localField: "number",
                foreignField: "number",
                as: "questionInfo",
              },
            },
          ])
          .toArray((err, docs) => {
            if (err) return res.status(500).send({ error: err });
            res.send(docs);
          });
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
        collection.updateOne(
          { number: req.body.number },
          {
            $set: {
              number: req.body.number,
              passed: req.body.passed,
              date: req.body.date,
            },
          },
          { upsert: true },
          function (error, result) {
            if (error) {
              res.status(500).status({ err: error });
            } else {
              res.status(200).status({ inserted: true });
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

router.route("/failed/").get((req, res) => {
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
      collection
        .aggregate([
          {
            $match: {
              passed: false,
            },
          },
          {
            $lookup: {
              from: "questionBank",
              localField: "number",
              foreignField: "number",
              as: "questionInfo",
            },
          },
        ])
        .toArray((err, docs) => {
          if (err) return res.status(500).send({ error: err });
          res.send(docs);
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
        client.close();
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
