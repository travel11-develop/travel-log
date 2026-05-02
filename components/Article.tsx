'use client';

import dynamic from "next/dynamic";
import { PostMeta } from "@/lib/types";
import RouteTimeline from "./RouteTimeline";

// SSR回避
const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

type Props = {
  meta: PostMeta;
  contentHtml: string;
};

export default function Article({ meta, contentHtml }: Props) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
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

      {/* 移動ルートセクション */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 pb-4 border-b-2 border-blue-500">移動ルート</h2>

        {/* マップと移動スケジュールを横に並べる */}
        <div className="flex gap-8">
          {/* 地図（左側） */}
          {meta.locations?.length > 0 && (
            <div className="flex-1">
              <Map locations={meta.locations} />
            </div>
          )}

          {/* ルートタイムライン（右側） */}
          <div className="flex-1">
            <RouteTimeline routes={meta.routes} />
          </div>
        </div>
      </div>

      {/* 本文 */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
