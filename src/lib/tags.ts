/**
 * Canonical tag vocabulary for the portfolio.
 */
export const CANONICAL_TAGS = [
  'AI Engineering',
  'Machine Learning',
  'Generative AI',
  'RAG',
  'Agents',
  'LLMs',
  'Evaluation',
  'MLOps',
  'Data Engineering',
  'NLP',
  'Speech AI',
  'Computer Vision',
  'Azure AI',
  'Python',
  'Research',
  'Career',
] as const;

export type CanonicalTag = (typeof CANONICAL_TAGS)[number];

const ALIASES: Record<string, CanonicalTag> = {
  llm: 'LLMs',
  llms: 'LLMs',
  'large language models': 'LLMs',
  'large-language-models': 'LLMs',
  rag: 'RAG',
  'retrieval augmented generation': 'RAG',
  agent: 'Agents',
  agents: 'Agents',
  ml: 'Machine Learning',
  'machine learning': 'Machine Learning',
  mlops: 'MLOps',
  evaluation: 'Evaluation',
  eval: 'Evaluation',
  nlp: 'NLP',
  python: 'Python',
  azure: 'Azure AI',
  foundry: 'Azure AI',
  'generative ai': 'Generative AI',
  genai: 'Generative AI',
  'ai engineering': 'AI Engineering',
  'data engineering': 'Data Engineering',
  'speech ai': 'Speech AI',
  asr: 'Speech AI',
  'computer vision': 'Computer Vision',
  research: 'Research',
  career: 'Career',
};

const KEYWORD_MAP: Array<{ pattern: RegExp; tag: CanonicalTag }> = [
  { pattern: /\b(retrieval|vector search|embeddings?)\b/i, tag: 'RAG' },
  {
    pattern: /\b(agent|tool calling|multi-agent|multi agent)\b/i,
    tag: 'Agents',
  },
  { pattern: /\b(llm|language model|prompt)\b/i, tag: 'LLMs' },
  {
    pattern: /\b(evaluation|benchmark|metrics)\b/i,
    tag: 'Evaluation',
  },
  { pattern: /\b(speech|audio|asr)\b/i, tag: 'Speech AI' },
  { pattern: /\b(azure|foundry)\b/i, tag: 'Azure AI' },
  {
    pattern: /\b(deployment|monitoring|inference|mlops)\b/i,
    tag: 'MLOps',
  },
  { pattern: /\b(python)\b/i, tag: 'Python' },
  {
    pattern: /\b(machine learning|\bml\b)\b/i,
    tag: 'Machine Learning',
  },
  { pattern: /\b(generative ai|genai)\b/i, tag: 'Generative AI' },
];

/**
 * Normalizes a raw tag string to a canonical tag when possible.
 */
export function normalizeTag(raw: string): string {
  const key = raw.trim().toLowerCase();
  return ALIASES[key] ?? raw.trim();
}

/**
 * Extracts tags from text using deterministic keyword mapping.
 */
export function extractTagsFromText(
  text: string,
  max = 5,
): CanonicalTag[] {
  const found = new Set<CanonicalTag>();
  for (const { pattern, tag } of KEYWORD_MAP) {
    if (pattern.test(text)) {
      found.add(tag);
    }
    if (found.size >= max) break;
  }
  return [...found];
}
