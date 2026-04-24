"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface QuarterMapProps {
  height?: string;
  activeQuarter?: string;
}

interface QuarterShape {
  slug: string;
  name: string;
  description: string;
  coordinates: [number, number][];
}

const QUARTERS: QuarterShape[] = [
  {
    slug: "kasbah",
    name: "Kasbah",
    description:
      "Behind the Mechouar, south of Jemaa el-Fna. The royal quarter: the Badi, the Saadian tombs, the hush.",
    coordinates: [
      [-7.9894, 31.6187],
      [-7.9834, 31.6187],
      [-7.9834, 31.6235],
      [-7.9894, 31.6235],
      [-7.9894, 31.6187],
    ],
  },
  {
    slug: "laksour",
    name: "Laksour",
    description:
      "A few minutes west of Jemaa el-Fna, through the souks. Vizir palaces behind plain doors.",
    coordinates: [
      [-7.9944, 31.6235],
      [-7.987, 31.6235],
      [-7.987, 31.629],
      [-7.9944, 31.629],
      [-7.9944, 31.6235],
    ],
  },
  {
    slug: "mouassine",
    name: "Mouassine",
    description:
      "The artisan and Saadian heart. A fountain, a mosque, galleries in old foundouks. Ten minutes from Jemaa el-Fna.",
    coordinates: [
      [-7.992, 31.629],
      [-7.985, 31.629],
      [-7.985, 31.634],
      [-7.992, 31.634],
      [-7.992, 31.629],
    ],
  },
  {
    slug: "bab-doukkala",
    name: "Bab Doukkala",
    description:
      "Near the northern gate, twelve minutes from Jemaa el-Fna. Bakers, workshops, local commerce. Less looked at.",
    coordinates: [
      [-7.998, 31.631],
      [-7.992, 31.631],
      [-7.992, 31.636],
      [-7.998, 31.636],
      [-7.998, 31.631],
    ],
  },
];

function centroid(ring: [number, number][]): [number, number] {
  // Average the unique vertices (drop the closing duplicate).
  const pts = ring.slice(0, -1);
  const sum = pts.reduce(
    (acc, [lng, lat]) => [acc[0] + lng, acc[1] + lat] as [number, number],
    [0, 0] as [number, number],
  );
  return [sum[0] / pts.length, sum[1] / pts.length];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ACCENT = "#1B2A4E";
const FILL_INACTIVE = 0.08;
const FILL_ACTIVE = 0.18;

export function QuarterMap({ height = "480px", activeQuarter }: QuarterMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.warn("[QuarterMap] NEXT_PUBLIC_MAPBOX_TOKEN missing; map not rendered.");
      return;
    }
    if (!containerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-7.9897, 31.6295],
      zoom: 14.5,
      scrollZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
    });
    map.touchZoomRotate.disableRotation();
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");

    const enableScrollZoom = () => map.scrollZoom.enable();
    map.once("click", enableScrollZoom);
    map.once("touchstart", enableScrollZoom);

    mapRef.current = map;

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 12,
      className: "quarter-map-popup",
      anchor: "bottom",
    });

    map.on("load", () => {
      try { map.setPaintProperty("background", "background-color", "#FAFAF8"); } catch {}
      try { map.setPaintProperty("water", "fill-color", "#E8E4DC"); } catch {}

      QUARTERS.forEach((quarter) => {
        const sourceId = `quarter-${quarter.slug}`;
        const fillId = `quarter-fill-${quarter.slug}`;
        const outlineId = `quarter-outline-${quarter.slug}`;
        const labelId = `quarter-label-${quarter.slug}`;
        const isActive = activeQuarter === quarter.slug;
        const restingOpacity = isActive ? FILL_ACTIVE : FILL_INACTIVE;
        const center = centroid(quarter.coordinates);
        const popupHtml = `<strong>${escapeHtml(quarter.name)}</strong>${escapeHtml(quarter.description)}`;

        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: { slug: quarter.slug, name: quarter.name },
            geometry: {
              type: "Polygon",
              coordinates: [quarter.coordinates],
            },
          },
        });

        map.addLayer({
          id: fillId,
          type: "fill",
          source: sourceId,
          paint: {
            "fill-color": ACCENT,
            "fill-opacity": restingOpacity,
          },
        });

        map.addLayer({
          id: outlineId,
          type: "line",
          source: sourceId,
          paint: {
            "line-color": ACCENT,
            "line-width": 1,
            "line-opacity": 0.3,
          },
        });

        map.addLayer({
          id: labelId,
          type: "symbol",
          source: sourceId,
          layout: {
            "text-field": quarter.name,
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Regular"],
            "text-size": 12,
            "text-letter-spacing": 0.12,
            "text-transform": "uppercase",
          },
          paint: {
            "text-color": "#111111",
          },
        });

        map.on("mouseenter", fillId, () => {
          map.getCanvas().style.cursor = "pointer";
          map.setPaintProperty(fillId, "fill-opacity", FILL_ACTIVE);
          popup.setLngLat(center).setHTML(popupHtml).addTo(map);
        });
        map.on("mouseleave", fillId, () => {
          map.getCanvas().style.cursor = "";
          map.setPaintProperty(fillId, "fill-opacity", restingOpacity);
          popup.remove();
        });
        map.on("click", fillId, () => {
          popup.remove();
          router.push(`/marrakech/${quarter.slug}`);
        });
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [activeQuarter, router]);

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return (
      <div
        className="flex w-full items-center justify-center bg-ink/5 font-ui text-meta text-quiet"
        style={{ height }}
      >
        Map will display here once NEXT_PUBLIC_MAPBOX_TOKEN is set.
      </div>
    );
  }

  return <div ref={containerRef} className="w-full" style={{ height }} />;
}
