var express = require("express");
var router = express.Router();
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;

var domain = "127.0.0.1";
var port = 27017;
var dbName = "test";
var destinationNode = "mongodb://" + domain + ":" + port;

router.use(function (req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});

router.route("/").get((req, res, next) => {
  var documents = [];
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

      var cursor = collection.find().sort({ _id: 1 });
      cursor.forEach(
        function (doc, err) {
          documents.push(doc);
        },
        function () {
          client.close();
          console.log(documents);
          res.render("questions", { name: documents });
        }
      );
    }
  );
});

router
  .route("/:questionid")
  .get((req, res) => {
    res.send("hi get /questions/" + req.params.questionid);
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
        var doc = { _id: 5, name: "Test", difficulty: "Easy", passed: "true" };

        // inserting document to 'questions collection' using insertOne
        var cursor = collection.insertOne(doc, function (err, res) {
          if (err) {
            console.log(err)
          };
          console.log("New Question Inserted");
        });
      }
    );
    res.send("hi put /questions/" + req.params.questionid);
  });

module.exports = router;
