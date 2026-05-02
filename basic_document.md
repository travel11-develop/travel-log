# 旅行記録Webアプリ 仕様書

## 1. 概要

本システムは、日本国内の旅行記録を公開する個人用Webサイトである。
記事は旅行単位で作成し、文章を中心に写真・地図・移動情報を組み合わせて記録する。

---

## 2. 技術構成

### フロントエンド

* Next.js（App Router）
* React
* TypeScript（推奨）

### データ管理

* Markdownファイルベース
* Gitによるバージョン管理

### デプロイ

* Vercel

---

## 3. ディレクトリ構成

```
/app
  layout.tsx
  page.tsx
  /posts
    /[slug]
      page.tsx

/components
  Article.tsx
  Map.tsx
  RouteTimeline.tsx

/content
  /posts
    2024-kyoto-trip.md

/lib
  (ユーティリティ関数など)

/public
  /images
    /2024-kyoto-trip
```

---

## 4. URL設計

```
/posts/{slug}
例：/posts/2024-kyoto-trip
```

---

## 5. 記事データ仕様（Markdown）

### フロントマター定義

以下の項目は必須とし、`locations` が空の場合は記事データとして無効とする。

```yaml
title: "京都旅行 2024"
slug: "2024-kyoto-trip"
start_date: "2024-04-01"
end_date: "2024-04-03"

area: "近畿"

tags:
  - 寺院
  - 観光
  - グルメ

cover_image: "/images/2024-kyoto-trip/cover.jpg"

locations:
  - name: "京都駅"
    lat: 34.9855
    lng: 135.7586
  - name: "清水寺"
    lat: 34.9948
    lng: 135.7850

routes:
  - type: "train" # train or bus
    from: "東京駅"
    to: "京都駅"
    departure_time: "08:00"
    arrival_time: "10:15"
    stops:
      - "東京"
      - "品川"
      - "新横浜"
      - "名古屋"
      - "京都"

  - type: "bus"
    from: "京都駅"
    to: "清水寺"
    departure_time: "11:00"
    arrival_time: "11:30"
    stops:
      - "京都駅"
      - "五条坂"
```

---

### 本文構造

```markdown
## 1日目

### 京都駅
到着後の様子...

### 清水寺
観光の感想...

## 2日目

...
```

---

## 6. エリア分類

以下の固定値とする：

1. 北海道・東北
2. 関東
3. 中部
4. 近畿
5. 中国・四国
6. 九州

---

## 7. コンポーネント仕様

### 7.1 Articleコンポーネント

* MarkdownをHTMLに変換して表示
* 見出しベースのレイアウト

---

### 7.2 Mapコンポーネント

#### 使用ライブラリ

* Leaflet

#### 機能

* locationsの座標をプロット
* ピンに名前表示
* ズーム・パン操作

---

### 7.3 RouteTimelineコンポーネント

#### 機能

* routes情報を時系列表示
* routesは `departure_time` 順にソートして表示
* 出発・到着時刻を視覚化
* stopsをリスト表示

#### UIイメージ

```
[08:00] 東京駅
   ↓
   品川
   ↓
   新横浜
   ↓
[10:15] 京都駅
```

---

## 8. 画像管理

### 保存場所

記事ごとに専用フォルダを作成し、画像をまとめて管理する。

```
/public/images/{slug}/
```

### 例

```
/public/images/2024-kyoto-trip/01.jpg
```

---

## 9. タグ機能

* 記事に複数タグを付与可能
* タグ別一覧ページおよびエリア別一覧ページは当面は必須としない
* 将来的に一覧ページの実装を検討する

---

## 10. 地図仕様

* 記事ごとに1つの地図を表示
* locations配列を元にマーカー表示
* ルート描画は行わない（現時点では）

---

## 11. 将来拡張

### 11.1 検索機能

* タイトル検索
* タグ検索
* エリア検索

### 11.2 データ移行

* Markdown → DB（Supabase等）

### 11.3 UI改善

* ルートの可視化強化
* 訪問履歴の可視化

---

## 12. 非機能要件

* SEO対応（SSR/SSG）
* モバイル対応（レスポンシブ）
* 高速表示（静的生成）
* アクセシビリティは一般的なウェブ標準に準拠する（特別要件は現時点では設定しない）

---

## 13. 開発ステップ

1. Markdown記事表示
2. フロントマターのパース
3. 地図表示（Leaflet）
4. ルートタイムラインUI実装
5. スタイル調整
6. デプロイ

---

