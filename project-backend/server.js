const queryOpenAI = require('./openai-api');
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();

const uri = 'mongodb+srv://emoruwatoluwanimi:AndreGray17@cluster0.rekr720.mongodb.net/';
const dbName = 'Hackthe6ix_Project';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.get('/foodInFridge', async(req,res) => {
  try {
    await client.connect()

    const db = client.db(dbName);
    const collection = db.collection('FoodInFridge');

    const data = await collection.find({}).toArray();
    console.log(data)
    res.json(data)
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/generateRecipeGPT', async(req,res) => {
  try {
      var data = await queryOpenAI('How much wood could a woodchuck chuck if a woodchuck could chuck wood?')
      res.json(data)
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
