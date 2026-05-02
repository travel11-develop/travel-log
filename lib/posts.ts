import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "./types";
import { validatePostMeta } from "./validation";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.md'))
    .map((file) =>
      file.replace(/\.md$/, "")
    );
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  try {
    validatePostMeta(data);
    return { meta: data, content };
  } catch (error) {
    throw new Error(
      `Invalid post '${slug}': ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export function getAllPosts(): Post[] {
  return getPostSlugs().map(getPostBySlug);
}
