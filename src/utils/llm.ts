export async function callLLM(model: string, messages: any[]) {
  switch (model) {
    case 'gpt-4o':
      return fetch('https://api.openai.com/v1/chat/completions', { … })
          .then(r => r.json());
    /* … cole aqui todos os outros cases: claude-sonnet, perplexity, grok-3, etc. … */
    default:
      throw new Error('Modelo não suportado');
  }
}
