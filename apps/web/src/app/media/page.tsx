import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "../../lib/mdx-utils";

export const dynamic = "force-static"; // Ensure static generation
export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "Media Library",
  description: "Browse our collection of media content",
};

export default function MediaIndexPage() {
  const posts = getAllPosts();

  // Sort posts by publishedAt date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.frontmatter.publishedAt).getTime();
    const dateB = new Date(b.frontmatter.publishedAt).getTime();
    return dateB - dateA;
  });

  return (
    <div className="container py-10">
      <h1>Media Library</h1>

      <div className="grid-container">
        {sortedPosts.map((post) => (
          <Link
            href={`/media/${post.slug}`}
            key={post.slug}
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <div className="aspect-video">
                {post.frontmatter.localImages && post.frontmatter.image && (
                  <Image
                    src={`/media/${post.slug}${post.frontmatter.image.replace(
                      ".",
                      "",
                    )}`}
                    alt={post.frontmatter.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>

              <div className="card-content">
                <h2 className="mb-2">{post.frontmatter.title}</h2>

                <div className="tags mb-3">
                  {post.frontmatter.tags?.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="article-meta">
                  <time>
                    {new Date(post.frontmatter.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </time>
                  {post.frontmatter.duration && (
                    <span>{post.frontmatter.duration}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
