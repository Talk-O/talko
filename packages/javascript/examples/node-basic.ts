import { TalkoClient } from '../src/index';

async function main(): Promise<void> {
  const apiKey = process.env.TALKO_API_KEY;
  if (!apiKey) {
    throw new Error('Missing TALKO_API_KEY');
  }

  const talko = new TalkoClient({ apiKey });

  const conversations = await talko.conversations.list({ status: 'OPEN', limit: 10 });
  console.log('Open conversations:', conversations);

  const connectors = await talko.connectors.list();
  console.log('Configured connectors:', connectors);
}

void main();
