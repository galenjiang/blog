import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { compileMDX } from "next-mdx-remote/rsc";
import { JSXElementConstructor, ReactElement } from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CLIENT_ROOT = process.cwd();

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchGithubContent<T>(path: string): Promise<T> {
  const headers = new Headers();
  headers.append("Accept", "application/vnd.github+json");
  headers.append("Authorization", `Bearer ${process.env.TOKEN}`);
  headers.append("X-GitHub-Api-Version", "2022-11-28");

  const response = await fetch(
    `https://api.github.com/repos/galenjiang/articles/contents/${path}`,
    {
      method: "GET",
      headers: headers,
      // cache: 'no-store'
      next: {
        revalidate: 24 * 60 * 60,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Can't get github content: ${path}!`);
  }

  return response.json();
}

export async function parseArticle(file: string) {
  if (file.includes("逻辑与集合")) console.log(file);
  return compileMDX<{ title: string; date: string; description: string }>({
    source: file,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex as any],
        format: "mdx",
      },
      parseFrontmatter: true,
    },
  });
}

export async function getArticle(name: string) {
  console.log("name", name);
  const file = await fetchGithubContent<{
    name: string;
    content: string;
  }>(`contents/${name}.md`);

  const article = Buffer.from(file.content, "base64").toString("utf8");
  return parseArticle(article);
}

export async function getAllArticles(): Promise<
  Array<{
    name: string;
    file: string;
    title: string;
    date: dayjs.Dayjs;
    description: string;
    content: ReactElement<any, string | JSXElementConstructor<any>>;
  }>
> {
  const articleNames = await fetchGithubContent<
    Array<{
      name: string;
    }>
  >("contents");

  const result = await Promise.allSettled(
    articleNames.map((article) => {
      return fetchGithubContent<{
        name: string;
        content: string;
      }>(`contents/${article.name}`);
    }),
  );
  const articles = [];
  for (const file of result) {
    if (file.status === "fulfilled") {
      const article = Buffer.from(file.value.content, "base64").toString(
        "utf8",
      );
      const { content, frontmatter } = await parseArticle(article);

      articles.push({
        name: file.value.name.replace(/\.mdx?$/, ""),
        file: file.value.name,
        title: frontmatter.title,
        date: dayjs(frontmatter.date),
        description: frontmatter.description,
        content: content,
      });
    }
  }

  return articles.sort((left, right) => {
    return left.date.isBefore(right.date) ? 1 : -1;
  });
}
