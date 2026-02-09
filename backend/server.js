const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const url = process.env.MONGO_URL;
let tasksCollection;

console.log("Mongo URL:", process.env.MONGO_URL);

MongoClient.connect(url).then(client => {
  const db = client.db("devboard");
  tasksCollection = db.collection("tasks");
  console.log("Mongo connected");
});

// add task
app.post("/tasks", async (req, res) => {
  const task = req.body.task;
  await tasksCollection.insertOne({ task });
  res.send("Task added");
});

// get tasks
app.get("/tasks", async (req, res) => {
  const tasks = await tasksCollection.find().toArray();
  res.json(tasks);
});

app.listen(5000, () => console.log("Backend running"));
