require('dotenv').config();
const OpenAI = require('openai');

const key = ''

const openai = new OpenAI({
    apiKey: key,
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
  
        console.log(response.choices[0].message.content.trim());
    } 
    catch (error) {
        console.error('Error querying OpenAI:', error);
    }
}

queryOpenAI('How much wood could a woodchuck chuck if a woodchuck could chuck wood?');