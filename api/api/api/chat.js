export default async function handler(req, res) {
  // Dozvoli samo POST zahteve
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Tvoj tajni ključ se čita iz Vercel okruženja
  const apiKey = process.env.GEMINI_API_KEY; 
  
  // Istorija poruka koju šalje frontend (index.html)
  const { history } = req.body; 

  // Ovde ćeš kasnije ubaciti svoje detaljne instrukcije za bota
  const systemPromptText = `Ti si stručni AI asistent za inženjersku kompaniju 'Milosavljević Smart Energy' (MSE) iz Prijedora... (dodaćeš tekst kasnije)`;

  try {
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPromptText }]
        },
        contents: history
      })
    });

    const data = await geminiRes.json();
    res.status(200).json(data);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Greška pri komunikaciji sa Gemini serverom' });
  }
}
