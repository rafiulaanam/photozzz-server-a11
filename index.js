const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const PORT = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://photozzzUser:Do1worC9KniQTG6r@cluster0.qdm6nzz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
    const serviceCollection = client.db('photozzz').collection('services')

    app.get('/services3',async(req,res)=>{
        const query ={};
        const cursor = serviceCollection.find(query).limit(3)
        const services = await cursor.toArray()
        res.send(services)
    })
    app.get('/services',async(req,res)=>{
        const query ={};
        const cursor = serviceCollection.find(query) 
        const services = await cursor.toArray()
        res.send(services)
    })
    app.get('/services/:id',async(req,res)=>{
        const id = req.params.id;
        const query ={_id: ObjectId(id)};
        const service = await serviceCollection.findOne(query)
        res.send(service)
        
    })
}
finally{

}

}
run().catch(e=>console.log(e))


app.get('/',(req,res)=>{
    res.send('server running')
})


app.listen(PORT)