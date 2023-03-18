const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vh3xqbm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
   try {
    const reviewsCollection = client.db('videoscript').collection('reviews');

    app.get('/reviews', async (req, res) => {
        const cursor = reviewsCollection.find({}).sort({"date" : -1});
        const reviewList = await cursor.toArray();
        res.send(reviewList);
    })

    app.get('/reviewsLimit', async (req, res) => {
        const cursor = reviewsCollection.find({}).sort({"date" : -1});
        const reviewsLimit = await cursor.limit(4).toArray();
        res.send(reviewsLimit);
    })

    app.post('/reviews', async (req, res) => {
        const review = req.body;
        const reviews = await reviewsCollection.insertOne(review);
        res.send(reviews);
    })

   } 
   finally {
       
   }
    
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('server is running');
})

app.listen(port, () => console.log(`server running on ${port}`));