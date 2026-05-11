// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
import type { ArticleInterface } from '#shared/interfaces/article.interface';

export type ArticleOverviewDto = Pick<ArticleInterface, 'id' | 'slug' | 'title' | 'overview' | 'publishedAt' | 'author'>;
