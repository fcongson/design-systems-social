import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

// Path to the MDX content relative to the project root in a monorepo
const CONTENT_PATH = path.join(
  process.cwd(),
  "../../packages/mdx-content/media",
);

// Convert directory name to URL slug
export function dirToSlug(dirName: string): string {
  return dirName
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Convert slug back to directory name
export function slugToDir(slug: string): string | null {
  const directories = fs.readdirSync(CONTENT_PATH);

  return directories.find((dir) => dirToSlug(dir) === slug) || null;
}

// Get all posts with their metadata (cached for performance)
export const getAllPosts = cache(() => {
  const directories = fs.readdirSync(CONTENT_PATH);

  const posts = directories
    .map((dir) => {
      const mdxPath = path.join(CONTENT_PATH, dir, "index.mdx");

      if (!fs.existsSync(mdxPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(mdxPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: dirToSlug(dir),
        frontmatter: data,
        dirName: dir,
      };
    })
    .filter(Boolean);

  return posts;
});

// Get a specific post by slug (cached for performance)
export const getPostBySlug = cache((slug: string) => {
  const dirName = slugToDir(slug);

  if (!dirName) {
    return null;
  }

  const mdxPath = path.join(CONTENT_PATH, dirName, "index.mdx");

  if (!fs.existsSync(mdxPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(mdxPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data,
    content,
    dirName,
  };
});
