require('dotenv').config();
const { OpenAI } = require('openai');

async function testAPI() {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        console.log('Testing OpenAI API...');
        console.log('API Key:', process.env.OPENAI_API_KEY ? '✅ Present' : '❌ Missing');

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: "Hello, are you working?" }
            ]
        });

        console.log('API Test Response:', response.choices[0].message.content);
        console.log('✅ API is working correctly!');
    } catch (error) {
        console.error('❌ API Error:', error.message);
    }
}

testAPI(); 