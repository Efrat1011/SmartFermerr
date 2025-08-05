const axios = require('axios');
const pool = require('../config/db'); // PostgreSQL pool

// Gemini API арқылы ауыл шаруашылығы туралы жауап алу
const askGemini = async (req, res) => {
  try {
    const userQuestion = req.body.question;

    const prompt = `
Сен ауыл шаруашылығы бойынша жауап беруге ғана міндетті жасанды интеллектісің.
Пайдаланушының сұрағына жауап бермес бұрын, оның ауыл шаруашылығына қатысты екенін тексер.
Егер сұрақ ауыл шаруашылығына қатысы болмаса, мына жауапты қайтар:
"Кешіріңіз, мен тек ауыл шаруашылығы бойынша жауап бере аламын."

Сұрақ: ${userQuestion}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Жауап табылмады.';
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error('🔴 Gemini қатесі:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI жауап бере алмады.' });
  }
};

// Кеңестер базасынан алу
const getTips = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, question, answer, created_at FROM tips ORDER BY created_at DESC'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('🔴 Кеңестерді алу кезінде қате:', error.message);
    res.status(500).json({ message: 'Серверде қате шықты, кеңестерді ала алмадық' });
  }
};

module.exports = {
  askGemini,
  getTips,
};
