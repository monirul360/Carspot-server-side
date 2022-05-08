const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USNAME}:${process.env.US_PASSWORD}@cluster0.gmbsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('Mongodb connect');
client.connect(err => {
    const collection = client.db("carspot").collection("items");
    // perform actions on the collection object
    client.close();
});

app.get('/', (req, res) => {
    res.send('Server running!')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})