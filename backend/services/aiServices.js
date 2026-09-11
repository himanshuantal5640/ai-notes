const OpenAi = require('openai');

const client = new OpenAi({
    apiKey: process.env.OPEN_ROUTER_API,
    baseURL: "https://openrouter.ai/api/v1"
})

const askAi = async(prompt) =>{
    const response = await client.chat.completions.create({
        
        model: "openrouter/free",
        messages: [
            {
                role:"user",
                content:prompt
            }
        ]
    });
    return response.choices[0].message.content;
}

module.exports = {askAi}