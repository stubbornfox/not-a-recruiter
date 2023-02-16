import axios from "axios";

export async function getCompletion(prompt) {
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    // '{\n  "model": "text-davinci-003",\n  "prompt": "Say this is a test",\n  "max_tokens": 7,\n  "temperature": 0\n}',
    {
      'model': 'text-curie-001',
      'prompt': prompt,
      'max_tokens': 200,
      'temperature': 0,
      'n': 1
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      }
    }
  );
  return response;
}
