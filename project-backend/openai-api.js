const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

async function queryOpenAI(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'user', content: prompt }
            ],
            max_tokens: 100,
        });
  
        return response.choices[0].message.content.trim(); 
    } 
    catch (error) {
        console.error('Error querying OpenAI:', error);
    }
}

module.exports = queryOpenAI;