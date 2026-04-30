// 旅行先
export type Location = {
  name: string;
  lat: number;
  lng: number;
};

// 交通ルート
export type Route = {
  type: "train" | "bus";
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  stops: string[];
};

// 記事データ
export type PostMeta = {
  title: string;
  slug: string;
  start_date: string;
  end_date: string;
  area: string;
  tags: string[];
  cover_image: string;
  locations: Location[];
  routes?: Route[];
};

export type Post = {
  meta: PostMeta;
  content: string;
};
