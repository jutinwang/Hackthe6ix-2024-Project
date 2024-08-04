const axios = require('axios');

async function fetchRecipeList(meal) {
    const recipeList =  `https://api.edamam.com/search?q=${meal}&app_id=10f674bd&app_key=ff7ca76ce1f24df1492cbc53c36bc605`;
    try {
        const response = await axios.get(recipeList);
        return response.data
    } catch (error) {
        console.error('Error fetching recipe list:', error);
    }
}

module.exports = fetchRecipeList;