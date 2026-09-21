/**
 * Owner-editable site settings.
 * Leave optional links empty to hide them from the UI.
 */
export const site = {
  name: 'Alazar Kessela',
  headline: 'AI / Data Science Portfolio',
  description:
    'Projects and writing in applied AI, machine learning, and data science.',
  tagline:
    'Building practical AI systems across machine learning, generative AI, RAG, agents, and data products.',

  /** Production origin for sitemap, canonical URLs, and Open Graph. */
  url: 'https://alazark777.github.io',

  /**
   * GitHub Pages base path.
   * Use "" for https://username.github.io/
   * Use "/repo-name" for https://username.github.io/repo-name/
   */
  base: '',

  github: 'https://github.com/alazark777',
  linkedin: 'https://www.linkedin.com/in/akessela/',
  email: '',

  showNewsletterSignup: false,
  newsletterSignupUrl: '',

  focusAreas: [
    'AI Engineering',
    'Machine Learning',
    'RAG',
    'Agents',
    'Data Science',
    'LLM Evaluation',
    'MLOps',
  ] as const,
} as const;

export type SiteConfig = typeof site;
