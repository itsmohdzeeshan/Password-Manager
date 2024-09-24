const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const parser  = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passOP';


console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working
const port = 3000
app.use(parser.json())
app.use(parser.json())
app.use(cors())


client.connect();

app.get('/', async (req, res) => {
    // we use for fetching
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.post('/', async (req, res) => {
    // we use for fetching
    const pass = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(pass)
    res.send({succes: true , result: findResult});
})

app.delete('/', async (req, res) => {
    // we use for fetching
    const pass = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteMany(pass)
    res.send({succes: true , result: findResult});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})