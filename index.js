const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster0.qdm6nzz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("photozzz").collection("services");
    const blogsCollection = client.db("photozzz").collection("blogs");
    const commentsCollection = client.db("photozzz").collection("comments");

    app.get("/services3", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query).limit(3);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });
    app.post("/services", async (req, res) => {
      const comment = req.body;
      const result = await serviceCollection.insertOne(comment);
      res.send(result);
    });
    app.get("/reviews", async (req, res) => {
      const email = req.query.email 
      const query = {email: email}
      const result = await commentsCollection.find(query).toArray()
      res.send(result)
    });

    app.delete('/reviews/:id', async(req,res)=>{
      const id = req.params.id 
      const query = {_id: ObjectId(id)}
      const result = await commentsCollection.deleteOne(query)
      res.send(result)
    })
  



    app.get("/comments", async (req, res) => {
      const id = req.query.id;
      const query = { serviceId: id };
      const result = await commentsCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/comments", async (req, res) => {
      const comment = req.body;
      const result = await commentsCollection.insertOne(comment);
      res.send(result);
    });

  
    
   

    app.get("/blogs", async (req, res) => {
      const query = {};
      const cursor = blogsCollection.find(query);
      const blogs = await cursor.toArray();
      res.send(blogs);
    });
    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const blogs = await blogsCollection.findOne(query);

      res.send(blogs);
    });
  } finally {
  }
}
run().catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(PORT);
