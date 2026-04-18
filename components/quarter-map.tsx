"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface QuarterMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  label?: string;
}

export function QuarterMap({ center, zoom = 15, label }: QuarterMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !containerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [center.lng, center.lat],
      zoom,
      attributionControl: true,
      interactive: true,
    });
    mapRef.current = map;

    new mapboxgl.Marker({ color: "#1B2A4E" })
      .setLngLat([center.lng, center.lat])
      .addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center.lat, center.lng, zoom]);

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return (
      <div className="flex aspect-[16/9] w-full items-center justify-center bg-ink/5 font-ui text-meta text-quiet">
        Map will display here once NEXT_PUBLIC_MAPBOX_TOKEN is set.
      </div>
    );
  }

  return (
    <figure>
      <div ref={containerRef} className="aspect-[16/9] w-full" />
      {label && (
        <figcaption className="mt-3 font-ui text-meta text-quiet">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
