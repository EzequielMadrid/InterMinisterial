"use server";

import Parser from "rss-parser";

export interface NewsItem {
  title: string;
  link: string;
  description: string;
}

export async function getNeuquenNews(): Promise<NewsItem[]> {
  const parser = new Parser();
  const feeds = [
    "https://www.lmneuquen.com/rss",
    "https://www.rionegro.com.ar/feed/",
    "https://www.minutoneuquen.com/rss",
    "https://www.mejorinformado.com/rss",
  ];

  const allNews: NewsItem[] = [];

  for (const f of feeds) {
    try {
      const feed = await parser.parseURL(f);
      feed.items.slice(0, 4).forEach((item) => {
        allNews.push({
          title: item.title ?? "",
          link: item.link ?? "",
          description: item.contentSnippet ?? "",
        });
      });
    } catch (error) {
      console.log("Error cargando RSS:", f);
    }
  }
  // shuffle and return a subset of news items
  return allNews.sort(() => Math.random() - 0.5).slice(0, 5);
}
