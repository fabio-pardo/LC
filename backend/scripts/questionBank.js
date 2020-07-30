const fs = require("fs");
const readLine = require("readline");
const { MongoClient } = require("mongodb");

async function processLineByLine() {
  const fileStream = fs.createReadStream("./questions.txt");
  const rl = readLine.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  var quests = [];
  for await (const line of rl) {
    var splitResult = line.split("|");
    var questionInfo = [];

    // retrieve our questions information
    splitResult.map((spl) => {
      if (spl.trim().length != 0 && !spl.includes("tv")) {
        questionInfo.push(spl.trim());
      }
    });

    // title and leetcode link
    questionInfo[1] = questionInfo[1].replace("[", "");
    questionInfo[1] = questionInfo[1].replace(")", "");
    questionInfo[1] = questionInfo[1].split("](");

    var solutions = questionInfo[2].split(",");
    var solnIndex = 0;
    for (var i = 0; i < solutions.length; i++) {
      var soln = solutions[i];
      if (soln.includes("Solution") || soln.includes("Java")) {
        solnIndex;
        break;
      }
    }

    solutions[solnIndex] = solutions[solnIndex].replace(")", "");
    solutions[solnIndex] = solutions[solnIndex].replace("[", "");
    solutions[solnIndex] = solutions[solnIndex].replace(
      "..",
      "https://github.com/FPardo1023/Leetcode/blob"
    );
    solutions[solnIndex] = solutions[solnIndex].split("](");
    questionInfo[2] = solutions[solnIndex][1];
    questionInfo[0] = Number(questionInfo[0]);
    questionInfo.length = 4;

    var questionObj = {
      number: questionInfo[0],
      titleInfo: questionInfo[1],
      solution: questionInfo[2],
      difficulty: questionInfo[3],
    };
    quests.push(questionObj);
    //break;
  }

  MongoClient.connect(
    "mongodb://127.0.0.1:27017",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, client) {
      var db = client.db("test");
      var collection = db.collection("questionBank");
      collection.insertMany(quests, function (err) {
        if (err) {
          console.log(err);
        }
        console.log("success");
        client.close();
      });
    }
  );
}

processLineByLine();
