import OpenAI from "openai";

const apiUrl = "https://api.openai.com/v1/chat/completions"; // Update with the correct API endpoint
const client = new OpenAI({
  apiKey:process.env.OPENAPI_TIRC_KEY,
  dangerouslyAllowBrowser: true,
});

const prompt = async (message) => {
  const response = await client.responses.create({
    model: "gpt-5",
    instructions: 'Please write a response using HTML tags. Do not use headers like h1, h2',
    input: message, 
  });

  console.log(response.output_text);
  return response.output_text;
};

const useGPT = () => {
  return {
    prompt,
  };
};

export default useGPT;
