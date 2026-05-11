// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
import type { ArticleDetailDto } from '#shared/dtos/article/article-detail.dto';
import type { ArticleOverviewDto } from '#shared/dtos/article/article-overview.dto';
import { articles } from '#shared/data/article.data';


export class ArticleService {
  static getAll(): ArticleOverviewDto[] {
    return articles.map(({ id, slug, title, overview, publishedAt, author }) => ({
      id,
      slug,
      title,
      overview,
      publishedAt,
      author,
    }));
  }

  static findBySlug(slug: string): ArticleDetailDto {
    const match = articles.find((item) => item.slug === slug);

    if (!match) {
      throw createError({ statusCode: 404, statusMessage: 'Article not found' });
    }

    return match;
  }
}
