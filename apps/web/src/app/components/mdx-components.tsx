import { MDXRemoteProps } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";

// Create MDX components with context for proper image paths
export function createMDXComponents(
  slug: string,
): MDXRemoteProps["components"] {
  return {
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      const src = props.src;

      if (!src || typeof src !== "string") return null;

      // Handle relative paths in MDX content
      const imageSrc = src.startsWith("./")
        ? `/media/${slug}${src.substring(1)}`
        : src;

      return (
        <div
          style={{
            position: "relative",
            margin: "var(--spacing-lg) 0",
          }}
        >
          <Image
            src={imageSrc}
            alt={props.alt || ""}
            width={800}
            height={450}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "var(--border-radius-md)",
            }}
            sizes="(max-width: 768px) 100vw, 800px"
            priority={false}
          />
        </div>
      );
    },
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const href = props.href;
      if (!href) return <a {...props} />;

      const isInternalLink = href.startsWith("/") || href.startsWith("#");

      if (isInternalLink) {
        return (
          <Link href={href} style={{ textDecoration: "underline" }}>
            {props.children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline" }}
        >
          {props.children}
        </a>
      );
    },
    // Add more custom components as needed
    h2: (props) => (
      <h2
        style={{
          marginTop: "var(--spacing-xl)",
          marginBottom: "var(--spacing-md)",
        }}
        {...props}
      />
    ),
    p: (props) => (
      <p style={{ marginBottom: "var(--spacing-md)" }} {...props} />
    ),
    ul: (props) => (
      <ul
        style={{
          paddingLeft: "var(--spacing-xl)",
          marginBottom: "var(--spacing-md)",
        }}
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        style={{
          paddingLeft: "var(--spacing-xl)",
          marginBottom: "var(--spacing-md)",
        }}
        {...props}
      />
    ),
    li: (props) => (
      <li style={{ marginBottom: "var(--spacing-xs)" }} {...props} />
    ),
    pre: (props) => (
      <pre
        style={{
          backgroundColor: "var(--color-background)",
          padding: "var(--spacing-md)",
          borderRadius: "var(--border-radius-md)",
          overflowX: "auto",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--font-size-sm)",
          margin: "var(--spacing-md) 0",
          border: "1px solid var(--color-border)",
        }}
        {...props}
      />
    ),
  };
}
