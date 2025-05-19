import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "../../../lib/mdx-utils";
import { createMDXComponents } from "../../components/mdx-components";

export const dynamic = "force-static"; // Ensure static generation
export const revalidate = 3600; // Revalidate every hour

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post?.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPostBySlug((await params).slug);

  if (!post) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.title,
    openGraph: {
      title: post.frontmatter.title,
      images: [post.frontmatter.image],
    },
  };
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPostBySlug((await params).slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, slug } = post;

  return (
    <div className="container">
      <article className="article">
        <header>
          <h1>{frontmatter.title}</h1>

          {frontmatter.localImages && frontmatter.poster && (
            <div className="aspect-video">
              <Image
                src={`/media/${slug}${frontmatter.poster.replace(".", "")}`}
                alt={frontmatter.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                style={{
                  objectFit: "cover",
                  borderRadius: "var(--border-radius-lg)",
                }}
                priority
              />
            </div>
          )}

          <div className="tags">
            {frontmatter.tags?.map((tag: string) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="article-meta">
            <time>
              {new Date(frontmatter.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {frontmatter.duration && <span>{frontmatter.duration}</span>}
          </div>

          {frontmatter.videoUrl && (
            <div>
              <a
                href={frontmatter.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="video-button"
              >
                Watch Video
              </a>
            </div>
          )}
        </header>

        <div className="mdx-content">
          <MDXRemote
            source={content}
            components={createMDXComponents(slug)}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>

        {frontmatter.speakers && frontmatter.speakers.length > 0 && (
          <div className="speakers">
            <h2>Speakers</h2>
            <ul>
              {frontmatter.speakers.map((speaker: string) => (
                <li key={speaker}>{speaker}</li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}
