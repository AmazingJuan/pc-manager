// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
import type { ArticleInterface } from '#shared/interfaces/article.interface';

export const articles: ArticleInterface[] = [
  {
    id: '1',
    slug: 'welcome-to-pc-manager',
    title: 'Welcome to PC Manager',
    overview: 'Why we built a single place for inventory, assignments, and lifecycle tracking.',
    body: 'PC Manager brings together hardware records, ownership, and warranty dates so IT can answer questions without spreadsheets. This article outlines the core workflows we are prioritizing first.',
    publishedAt: '2026-04-02',
    author: 'IT Team',
  },
  {
    id: '2',
    slug: 'labeling-and-locations',
    title: 'Labeling machines and room locations',
    overview: 'Practical tips for keeping physical assets aligned with the directory.',
    body: 'Consistent naming and location fields make audits faster. We recommend tying each asset to a room or rack label that matches what staff use day to day.',
    publishedAt: '2026-04-18',
    author: 'IT Team',
  },
  {
    id: '3',
    slug: 'warranty-tracking',
    title: 'Staying ahead of warranty windows',
    overview: 'Use warranty end dates to plan refreshes before support lapses.',
    body: 'Export or filter by warranty expiration to build a rolling replacement plan. Pairing this with maintenance notes helps justify upgrades to finance.',
    publishedAt: '2026-05-01',
    author: 'IT Team',
  },
];
