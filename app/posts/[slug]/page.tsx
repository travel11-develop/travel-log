import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import Article from "@/components/Article";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({
    slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const contentHtml = await markdownToHtml(post.content);

  return <Article meta={post.meta} contentHtml={contentHtml} />;
}
