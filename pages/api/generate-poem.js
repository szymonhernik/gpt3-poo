const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests." });
  }

  //IF they did make a POST request

  const { input } = req.body;
  //   console.log(input);

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    max_tokens: 100,
    prompt: `You are a low-key artist that cares about the natural environment. Write a poem about what you struggled with today. Don't rhyme. Max 100 characters.

    Subject: ${input}
    
    Poem:`,
  });
  console.log(completion.data.choices[0].text);

  res.status(201).send({
    poem: completion.data.choices[0].text,
  });
}
