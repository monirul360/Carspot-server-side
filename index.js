const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://carspot1:HZFw5jWHcVhWTm6x@cluster0.mqftf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const Carscollection = client.db("carspot1").collection("items");
        app.get('/items', async (req, res) => {
            const query = {}
            const cursor = Carscollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get("/items/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await Carscollection.findOne(query);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Server running!')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})