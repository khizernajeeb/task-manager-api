var { MongoClient } = require("mongodb");
const serverless = require("serverless-http");
var url = process.env.MONGO_URL;

MongoClient.connect(
  url,
  { useUnifiedTopology: true, useCreateIndex: true, autoIndex: true },
  (error, client) => {
    if (error) {
      return console.log("Connection failed for some reason");
    }
    console.log("Connection established - All well");
    const db = client.db("myproject");

    db.collection("tasks")
      .deleteMany({ description: "Updated Task" })
      .then((task) => {
        console.log(task);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
