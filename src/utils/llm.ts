export async function callLLM(model: string, messages: any[]) {
  switch (model) {
    case 'gpt-4o':
      return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({ model: 'gpt-4o-mini', messages }),
      }).then(r => r.json());

    case 'claude-sonnet':
      return fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY!,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({ model: 'claude-sonnet', messages }),
      }).then(r => r.json());

    // … adicione aqui os outros casos (perplexity, grok-3, etc) seguindo este padrão …

    default:
      throw new Error('Modelo não suportado: ' + model);
  }
}
