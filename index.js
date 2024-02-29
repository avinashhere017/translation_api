
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/translate', async (req, res) => {
  try {
    if (!req.body || !req.body.text) {
      return res.status(400).json({ error: 'Missing or invalid request body. Please provide JSON data with a "text" field.' });
    }
    
    const englishText = req.body.text;

    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', 'fr'); 
    encodedParams.set('text', englishText);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '121c5001d9msh6a9fa02cc0aea76p16c57ajsn238348ab4507',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: encodedParams,
    };

    const response = await axios.request(options);
    
    const translatedText = response.data.data.translatedText;

    res.json({ translation: translatedText });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
