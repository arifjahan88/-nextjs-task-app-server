const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// username = taskmanagementDB
//dbpass = yQFXQY60WtOicVrO

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b8vg83y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const addtaskcollection = client
      .db("taskmanagementDB")
      .collection("addtsks");

    app.post("/addtask", async (req, res) => {
      const query = req.body;
      const result = await addtaskcollection.insertOne(query);
      res.send(result);
    });

    app.get("/addtaskall", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await addtaskcollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/taskdelete/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await addtaskcollection.deleteOne(filter);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Task Management server is Running");
});
app.listen(port, () => {
  console.log(`Task Management is running on Port : ${port}`);
});
