import { PostMeta } from "@/lib/types";

type Props = {
  meta: PostMeta;
  contentHtml: string;
};

export default function Article({ meta, contentHtml }: Props) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8 pb-8 border-b border-gray-200">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{meta.title}</h1>

        <div className="flex flex-col gap-2 mb-6 text-gray-600">
          <time className="text-sm">
            {meta.start_date} - {meta.end_date}
          </time>
          <p className="text-sm">{meta.area}エリア</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {meta.cover_image && (
        <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
          <img
            src={meta.cover_image}
            alt={meta.title}
            className="w-full h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
