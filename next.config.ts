import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// Static export: the build in /out can be served from any static host or CDN.
// The dev server gets its own folder so running `npm run build` alongside it
// doesn't wipe the dev server's compiled CSS.
export default function config(phase: string): NextConfig {
  return {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  };
}
