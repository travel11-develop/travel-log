import { Route } from "@/lib/types";

type Props = {
  routes?: Route[];
};

export default function RouteTimeline({ routes }: Props) {
  if (!routes || routes.length === 0) return null;

  // 時刻順ソート
  const sortedRoutes = [...routes].sort((a, b) =>
    a.departure_time.localeCompare(b.departure_time)
  );

  return (
    <div>
      <div className="space-y-4">
        {sortedRoutes.map((route, index) => (
          <div key={index} className="border-l-4 border-blue-400 pl-4 pb-4">
            {/* 出発 */}
            <div className="font-semibold text-sm">
              [{route.departure_time}] {route.from}
            </div>
            {/* 種別 */}
            <div className="text-xs text-gray-500 mt-1 inline-block px-2 py-1 bg-gray-100 rounded">
              {route.type === "train" ? "電車" : "バス"}
            </div>
            {/* stops */}
            <div className="ml-2 my-2 space-y-1 text-gray-600 text-sm">
              {route.stops.map((stop, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-gray-400">↓</span>
                  <span className="text-xs">{stop}</span>
                </div>
              ))}
            </div>

            {/* 到着 */}
            <div className="font-semibold text-sm">
              [{route.arrival_time}] {route.to}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
