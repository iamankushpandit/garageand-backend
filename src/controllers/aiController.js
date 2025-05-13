const fetch = require('node-fetch')

const generateDescription = async (req, res) => {
  const { title, condition = 'good' } = req.body

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Item title is required',
    })
  }

  const prompt = `Write a short, friendly product description for a garage sale item titled: "${title}". It's in ${condition} condition.`

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000', // required by OpenRouter
        'X-Title': 'GarageAnd AI', // required by OpenRouter
      },
      body: JSON.stringify({
        model: "gryphe/mythomax-l2-13b",
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('OpenRouter API error:', data)
      return res.status(500).json({
        success: false,
        message: data.error?.message || 'Failed to get AI description',
      })
    }

    const aiText = data.choices?.[0]?.message?.content?.trim()

    res.status(200).json({
      success: true,
      description: aiText,
    })
  } catch (error) {
    console.error('AI Error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to generate description',
    })
  }
}

module.exports = { generateDescription }
