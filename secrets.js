const mongodb = process.env.MONGODB_URI || "";

const dbName = "leetcode";

//var domain = "127.0.0.1";
//var port = 27017;
//var destinationNode = "mongodb://" + domain + ":" + port;

module.exports.mongodb = mongodb;
module.exports.dbName = dbName;
