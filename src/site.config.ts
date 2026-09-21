/**
 * Owner-editable site settings.
 * Leave optional links empty to hide them from the UI.
 */
export const site = {
  name: 'Alazar Kessela',
  headline: 'Applied AI & Data Science',
  description:
    'Projects and articles on practical AI systems, machine learning, generative AI, retrieval, and data science.',
  tagline:
    'Exploring practical AI systems—from machine learning foundations to generative AI applications, retrieval, agents, and the data workflows behind them.',

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
  showThemeToggle: true,

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
