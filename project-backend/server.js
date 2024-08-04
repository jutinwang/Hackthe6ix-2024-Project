const queryOpenAI = require('./openai-api');
const fetchRecipeList = require('./edmam-api');
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

app.get('/generateRecipeGPT/:ingredients', async(req,res) => {
  try {
      const ingredients = req.params.ingredients;
      var prompt = `Can you generate some 5 meal ideas with the following ingredients ${ingredients}. Can your response have a + between each word and a | between each recipe?`
      var data = await queryOpenAI(prompt)
      var recipeIdeas = data.split('|');

      var recipeDetails = []

      for (let i = 0; i < recipeIdeas.length; i++) {
          var newRecipeList = recipeIdeas[i].trim().split(" ");
          var newRecipe = newRecipeList[newRecipeList.length - 1];

          var newRecipeDetails = await fetchRecipeList(newRecipe);
          recipeDetails.push(newRecipeDetails);
      }

      res.json(recipeDetails)
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/addFood', async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('FoodInFridge');
    
    var { foodName, amount, datePurchased } = req.body;

    if (!foodName || !amount || !datePurchased) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    foodName = foodName.toLowerCase()

    const newFoodItem = {
      food: foodName,
      amount: parseFloat(amount),
      calories: parseFloat(amount) * 1.3, 
      expiryDate: "24/09/2024"
    };

    await collection.insertOne(newFoodItem);

    res.status(201).json({ message: 'Food added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
