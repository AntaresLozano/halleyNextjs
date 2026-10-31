// Recorre el sitio público: capturas full-page + por viewport, enlaces, imágenes rotas y errores de consola.
// Uso: node e2e/audit/crawl.mjs <outDir> [baseUrl]
import { chromium, devices } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const out = process.argv[2];
const base = process.argv[3] ?? "https://www.halleycinema.com";
fs.mkdirSync(out, { recursive: true });

const seeds = ["/", "/services", "/portfolio", "/blogs", "/contact"];
// Las tarjetas del blog navegan con onClick (sin <a href>), así que los detalles se obtienen del CMS.
const cms = process.env.STRAPI_URL ?? "https://cms.halleycinema.com";
const blogs = await fetch(`${cms}/api/blogs?pagination[pageSize]=100&fields[0]=slug`).then((r) => r.json()).catch(() => ({ data: [] }));
for (const b of blogs.data ?? []) seeds.push(`/blogs/${b.slug}`);
const skip = (u) => /^\/services\/\d+$/.test(u) && process.env.CRAWL_SKIP_KNOWN_404 === "1";
const profiles = { desktop: { viewport: { width: 1440, height: 900 } }, mobile: devices["iPhone 13"] };
const browser = await chromium.launch();
const report = {};
const queue = [...seeds];
const seen = new Set();

async function audit(ctx, url, label, name) {
  const page = await ctx.newPage();
  const errors = [];
  const failed = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 300)));
  page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message.slice(0, 300)));
  page.on("response", (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`));
  const resp = await page.goto(base + url, { waitUntil: "networkidle", timeout: 60000 }).catch((e) => ({ status: () => "ERR " + e.message }));
  await page.waitForTimeout(1500);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = page.viewportSize().height;
  const dir = path.join(out, name, label);
  fs.mkdirSync(dir, { recursive: true });
  let i = 0;
  for (let y = 0; y < h && i < 14; y += vh, i++) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(dir, `${String(i).padStart(2, "0")}.png`) });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(dir, "full.png"), fullPage: true });
  const info = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? null,
    lang: document.documentElement.lang,
    h1: [...document.querySelectorAll("h1")].map((e) => e.innerText.trim()),
    h2: [...document.querySelectorAll("h2")].map((e) => e.innerText.trim()).slice(0, 30),
    links: [...new Set([...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")))],
    brokenImgs: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
    imgsNoAlt: [...document.images].filter((i) => !i.alt).map((i) => i.src).slice(0, 20),
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
    text: document.body.innerText.slice(0, 4000),
  }));
  await page.close();
  return { status: resp?.status?.(), height: h, errors: [...new Set(errors)], failed: [...new Set(failed)], ...info };
}

while (queue.length) {
  const url = queue.shift();
  if (seen.has(url) || skip(url)) continue;
  seen.add(url);
  const name = url === "/" ? "home" : url.replace(/^\//, "").replace(/\//g, "__");
  report[url] = {};
  for (const [label, opts] of Object.entries(profiles)) {
    const ctx = await browser.newContext(opts);
    report[url][label] = await audit(ctx, url, label, name);
    await ctx.close();
  }
  for (const l of report[url].desktop.links) {
    let p = l;
    try { const u = new URL(l, base); if (!u.hostname.endsWith("halleycinema.com")) continue; p = u.pathname; } catch { continue; }
    if (!seen.has(p) && !queue.includes(p)) queue.push(p);
  }
}
// también las rutas que el crawler no descubre por enlaces (navegación por onClick)
fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
await browser.close();
console.log("pages:", Object.keys(report).join(", "));
