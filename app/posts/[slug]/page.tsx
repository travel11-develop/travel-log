import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const contentHtml = await markdownToHtml(post.content);

  return (
    <article style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>{post.meta.title}</h1>

      <p>
        {post.meta.start_date} - {post.meta.end_date}
      </p>

      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
