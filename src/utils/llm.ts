export async function callLLM(model: string, messages: any[]) {
  switch (model) {
    // OpenAI
    case 'gpt-4o':
    case 'gpt-4o-mini':
    case 'gpt-3.5-mini':
      return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({ model, messages }),
      }).then(r => r.json());

    // Anthropic
    case 'claude-sonnet':
    case 'claude-opus':
      return fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY!,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({ model, messages }),
      }).then(r => r.json());

    // Google Gemini
    case 'gemini-2.5-pro':
      return fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateText?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: messages.map(m => m.content).join('\n'),
            temperature: 0.7,
          }),
        }
      ).then(r => r.json());

    // Perplexity
    case 'perplexity':
      return fetch('https://api.perplexity.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        },
        body: JSON.stringify({ model: 'sonar-pro', messages }),
      }).then(r => r.json());

    // xAI Grok
    case 'grok-3':
      return fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.XAI_API_KEY}`,
        },
        body: JSON.stringify({ model, messages }),
      }).then(r => r.json());

    // DeepSeek
    case 'deepseek-r1':
    case 'deepseek-v3':
      return fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({ model, messages }),
      }).then(r => r.json());

    // Sabiá 3
    case 'sabia-3':
      return fetch('https://api.maritaca.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MARITACA_API_KEY}`,
        },
        body: JSON.stringify({ model, messages }),
      }).then(r => r.json());

    // Leonardo (image)
    case 'leonardo-phoenix':
      return fetch(
        'https://cloud.leonardo.ai/api/rest/v1/generations/text-to-image',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.LEONARDO_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: messages[messages.length - 1].content,
          }),
        }
      ).then(r => r.json());

    // Flux Pro
    case 'flux-pro':
      return fetch('https://api.segmind.com/v1/flux-pro/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': process.env.SEGMIND_API_KEY!,
        },
        body: JSON.stringify({
          prompt: messages[messages.length - 1].content,
        }),
      }).then(r => r.json());

    // Imagen 3
    case 'imagen-3':
      return fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/imagen-3:generateImage?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: { text: messages[messages.length - 1].content },
          }),
        }
      ).then(r => r.json());

    default:
      throw new Error(`Modelo não suportado: ${model}`);
  }
}
