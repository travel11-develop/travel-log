import { PostMeta, Location, Route } from "./types";

function isValidLocation(data: any): data is Location {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.name === "string" &&
    data.name.length > 0 &&
    typeof data.lat === "number" &&
    data.lat >= -90 &&
    data.lat <= 90 &&
    typeof data.lng === "number" &&
    data.lng >= -180 &&
    data.lng <= 180
  );
}

function isValidRoute(data: any): data is Route {
  return (
    typeof data === "object" &&
    data !== null &&
    (data.type === "train" || data.type === "bus") &&
    typeof data.from === "string" &&
    data.from.length > 0 &&
    typeof data.to === "string" &&
    data.to.length > 0 &&
    typeof data.departure_time === "string" &&
    typeof data.arrival_time === "string" &&
    Array.isArray(data.stops)
  );
}

export function validatePostMeta(data: any): asserts data is PostMeta {
  const required = [
    "title",
    "slug",
    "start_date",
    "end_date",
    "area",
    "tags",
    // "cover_image",
    "locations"
  ];

  for (const field of required) {
    if (!(field in data)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (!Array.isArray(data.locations) || data.locations.length === 0) {
    throw new Error("At least one location is required");
  }

  if (!data.locations.every(isValidLocation)) {
    throw new Error(
      "Invalid location structure (name, lat, lng required; lat: -90~90, lng: -180~180)"
    );
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    throw new Error("At least one tag is required");
  }

  if (data.routes) {
    if (!Array.isArray(data.routes)) {
      throw new Error("routes must be an array");
    }
    if (!data.routes.every(isValidRoute)) {
      throw new Error(
        "Invalid route structure (type must be 'train' or 'bus')"
      );
    }
  }
}
