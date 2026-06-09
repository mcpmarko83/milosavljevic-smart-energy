
// pages/api/chat.js (ili app/api/chat/route.js zavisno od tvoje strukture)

export default async function handler(req, res) {
  // Dozvoli samo POST zahteve
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Uzmi API ključ iz environment varijable
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY nije definisana');
    return res.status(500).json({ error: 'Server nije konfigurisan' });
  }

  // Istorija poruka koju šalje frontend
  const { history } = req.body;
  if (!history || !Array.isArray(history)) {
    return res.status(400).json({ error: 'Invalid or missing history' });
  }

  // System prompt (možeš ga prilagoditi)
  const systemPromptText = `Ti si stručni AI asistent za inženjersku kompaniju 'Milosavljević Smart Energy' (MSE) iz Prijedora. 
Odgovaraj profesionalno, precizno i ljubazno na srpskom jeziku. 
Pomažeš oko elektroinstalacija, pametnih kuća, industrijske automatizacije i robotike. 
Ako ne znaš odgovor, reci da ćeš proslediti pitanje inženjeru. 
Budzi konkretan i koristan.`;

  try {
    // Koristimo model gemini-2.5-flash (dostupan u tvojoj listi)
    const modelName = 'gemini-2.5-flash'; // Možeš i 'gemini-flash-latest'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const requestBody = {
      system_instruction: {
        parts: [{ text: systemPromptText }]
      },
      contents: history
    };

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error('Gemini API greška:', geminiRes.status, errorText);
      return res.status(geminiRes.status).json({ error: `Gemini API vratio grešku: ${geminiRes.status}` });
    }

    const data = await geminiRes.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Greška u handleru:', error);
    return res.status(500).json({ error: 'Greška pri komunikaciji sa Gemini serverom' });
  }
}
