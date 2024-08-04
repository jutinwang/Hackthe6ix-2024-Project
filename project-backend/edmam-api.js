const axios = require('axios');
const recipeList =  "https://api.edamam.com/search?q=biryani&app_id=10f674bd&app_key=ff7ca76ce1f24df1492cbc53c36bc605";

async function fetchRecipeList() {
    try {
        const response = await axios.get(recipeList);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching recipe list:', error);
    }
}