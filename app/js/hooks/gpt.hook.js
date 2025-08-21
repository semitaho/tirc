import OpenAI from "openai";

const apiKey =     "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";
const client = new OpenAI({
  apiKey,
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
