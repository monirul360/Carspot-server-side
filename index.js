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

        app.post('/items', async (req, res) => {
            const item = req.body;
            const result = await Carscollection.insertOne(item);
            res.send(result);
        })
        // Myitems api 
        app.get('/myitems', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const cursor = Carscollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        // My Items Delete api 
        app.delete('/myitems/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await Carscollection.deleteOne(query);
            res.send(result);
        })

        // update quantity
        app.put('/items/:id', async (req, res) => {
            const id = req.params.id;
            const updatedquantity = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: updatedquantity.quantity,
                }
            };
            const result = await Carscollection.updateOne(filter, updatedDoc, options);
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