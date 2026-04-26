import type { ReactNode } from "react";

// Sanctioned exception to the pure-white site rule (CLAUDE.md): the
// /properties/* route tree sits on a warm off-white #F0EEEA, matching
// the Modern House Sales register. Pure white reads as Sotheby's-sterile;
// off-white signals an agency canvas with quiet warmth underneath.
export default function PropertiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="bg-[#F0EEEA]">{children}</div>;
}
