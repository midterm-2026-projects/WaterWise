import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { build } from "vite";

const frontendRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);

let outputDirectory;
let manifest;
let serviceWorker;
let builtHtml;
let applicationBundle;

beforeAll(async () => {
  outputDirectory = await mkdtemp(path.join(tmpdir(), "waterwise-pwa-"));

  await build({
    root: frontendRoot,
    configFile: path.join(frontendRoot, "vite.config.js"),
    logLevel: "silent",
    build: {
      emptyOutDir: true,
      outDir: outputDirectory,
    },
  });

  manifest = JSON.parse(
    await readFile(path.join(outputDirectory, "manifest.webmanifest"), "utf8"),
  );
  serviceWorker = await readFile(path.join(outputDirectory, "sw.js"), "utf8");
  builtHtml = await readFile(path.join(outputDirectory, "index.html"), "utf8");

  const assetNames = await readdir(path.join(outputDirectory, "assets"));
  const applicationBundleName = assetNames.find(
    (name) => name.startsWith("index-") && name.endsWith(".js"),
  );
  applicationBundle = await readFile(
    path.join(outputDirectory, "assets", applicationBundleName),
    "utf8",
  );
}, 30_000);

afterAll(async () => {
  if (outputDirectory) {
    await rm(outputDirectory, { force: true, recursive: true });
  }
});

describe("Week 6 Day 1 production PWA", () => {
  it("generates an installable standalone manifest with required icons", () => {
    expect(manifest).toMatchObject({
      name: "WaterWise Consumer Portal",
      short_name: "WaterWise",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#0f172a",
      theme_color: "#0f172a",
    });

    expect(manifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ sizes: "192x192", purpose: "any" }),
        expect.objectContaining({ sizes: "512x512", purpose: "any" }),
        expect.objectContaining({ sizes: "512x512", purpose: "maskable" }),
      ]),
    );
  });

  it("generates and registers the service worker for automatic updates", async () => {
    const outputFiles = await readdir(outputDirectory);

    expect(outputFiles).toContain("sw.js");
    expect(outputFiles.some((name) => name.startsWith("workbox-"))).toBe(true);
    expect(builtHtml).toContain('rel="manifest"');
    expect(builtHtml).toContain("/manifest.webmanifest");
    expect(applicationBundle).toContain("serviceWorker");
    expect(applicationBundle).toContain("sw.js");
  });

  it("precaches core assets and supplies an offline navigation fallback", () => {
    expect(serviceWorker).toContain("index.html");
    expect(serviceWorker).toMatch(/assets\/index-[^"']+\.js/);
    expect(serviceWorker).toMatch(/assets\/index-[^"']+\.css/);
    expect(serviceWorker).toContain(".svg");
    expect(serviceWorker).toContain("createHandlerBoundToURL");
    expect(serviceWorker).toContain('NavigationRoute');
  });

  it("uses NetworkFirst caching for Supabase GET requests", () => {
    expect(serviceWorker).toContain("supabase");
    expect(serviceWorker).toContain("NetworkFirst");
    expect(serviceWorker).toContain("waterwise-supabase-api");
    expect(serviceWorker).toMatch(/["']GET["']/);
  });

  it("emits valid icon assets at the declared resolutions", async () => {
    const icon192 = await readFile(
      path.join(outputDirectory, "pwa-icon-192.svg"),
      "utf8",
    );
    const icon512 = await readFile(
      path.join(outputDirectory, "pwa-icon-512.svg"),
      "utf8",
    );
    const maskable = await readFile(
      path.join(outputDirectory, "pwa-icon-maskable.svg"),
      "utf8",
    );

    expect(icon192).toMatch(/width="192" height="192"/);
    expect(icon512).toMatch(/width="512" height="512"/);
    expect(maskable).toMatch(/width="512" height="512"/);
    expect(maskable).toContain('<rect width="512" height="512"');
  });
});
