const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/notion', async (req, res) => {
  const { notionToken, ...body } = req.body;
  if (!notionToken) {
    return res.status(400).json({ error: 'Notion Token fehlt.' });
  }
  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Proxy-Fehler', details: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Proxy läuft auf Port', PORT)); 
