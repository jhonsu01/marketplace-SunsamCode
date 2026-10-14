#!/usr/bin/env node
/**
 * Synchronises marketplace.json and icons/ with the latest GitHub release of every connector in
 * sources.json. No dependencies (Node >= 20).
 *
 *   node scripts/sync.mjs            # write marketplace.json + icons/
 *   node scripts/sync.mjs --check    # exit 1 if anything would change (CI)
 *
 * For each repo: latest release → the .mcpb (or .dxt) asset → sha256 + size, and from inside the
 * package (a ZIP) its manifest.json (version, names, description, tools, platforms) and icon.
 * GITHUB_TOKEN is optional (raises the API rate limit).
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join } from "node:path";
import { inflateRawSync } from "node:zlib";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const CHECK = process.argv.includes("--check");
const headers = {
  accept: "application/vnd.github+json",
  "user-agent": "marketplace-SunsamCode-sync",
  ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function getJson(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

async function getBuffer(url) {
  const res = await fetch(url, { headers: { "user-agent": headers["user-agent"] }, redirect: "follow" });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Minimal ZIP reader: returns a map of entry name → () => Buffer. */
function readZip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i -= 1) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("not a zip file");
  const count = buf.readUInt16LE(eocd + 10);
  let offset = buf.readUInt32LE(eocd + 16);
  const entries = new Map();
  for (let n = 0; n < count; n += 1) {
    if (buf.readUInt32LE(offset) !== 0x02014b50) throw new Error("bad central directory");
    const method = buf.readUInt16LE(offset + 10);
    const compressedSize = buf.readUInt32LE(offset + 20);
    const nameLength = buf.readUInt16LE(offset + 28);
    const extraLength = buf.readUInt16LE(offset + 30);
    const commentLength = buf.readUInt16LE(offset + 32);
    const localOffset = buf.readUInt32LE(offset + 42);
    const name = buf.toString("utf8", offset + 46, offset + 46 + nameLength).replaceAll("\\", "/");
    entries.set(name, () => {
      const localNameLength = buf.readUInt16LE(localOffset + 26);
      const localExtraLength = buf.readUInt16LE(localOffset + 28);
      const start = localOffset + 30 + localNameLength + localExtraLength;
      const data = buf.subarray(start, start + compressedSize);
      if (method === 0) return Buffer.from(data);
      if (method === 8) return inflateRawSync(data);
      throw new Error(`unsupported zip method ${method} for ${name}`);
    });
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

function firstSentence(text = "") {
  const match = /^(.{20,160}?[.!?])(\s|$)/u.exec(text.trim());
  return (match ? match[1] : text.trim().slice(0, 160)).trim();
}

async function syncConnector(source) {
  const release = await getJson(`https://api.github.com/repos/${source.repo}/releases/latest`);
  const asset = release.assets.find((a) => /\.(mcpb|dxt)$/iu.test(a.name));
  if (!asset) throw new Error(`${source.repo}: latest release ${release.tag_name} has no .mcpb asset`);
  const pkg = await getBuffer(asset.browser_download_url);
  const zip = readZip(pkg);
  const manifestEntry = zip.get("manifest.json");
  if (!manifestEntry) throw new Error(`${source.repo}: package has no manifest.json`);
  const manifest = JSON.parse(manifestEntry().toString("utf8").replace(/^﻿/u, ""));
  const name = String(manifest.name);

  let icon;
  const iconPath = typeof manifest.icon === "string" ? manifest.icon.replace(/^\.\//u, "") : null;
  if (iconPath && zip.has(iconPath)) {
    const ext = extname(iconPath).toLowerCase() || ".png";
    icon = `icons/${name}${ext}`;
    const data = zip.get(iconPath)();
    const target = join(ROOT, icon);
    const current = existsSync(target) ? await readFile(target) : null;
    if (!current || !current.equals(data)) {
      if (CHECK) throw new Error(`${icon} would change`);
      await writeFile(target, data);
    }
  }

  return {
    name,
    displayName: manifest.display_name || name,
    shortDescription: source.shortDescription || firstSentence(manifest.description),
    description: manifest.description ?? "",
    category: source.category ?? "Other",
    ...(source.brandColor ? { brandColor: source.brandColor } : {}),
    version: String(manifest.version),
    author: manifest.author?.name ?? "",
    license: manifest.license ?? "",
    repository: `https://github.com/${source.repo}`,
    homepage: manifest.homepage ?? `https://github.com/${source.repo}`,
    platforms: manifest.compatibility?.platforms ?? [],
    tools: (manifest.tools ?? []).map((tool) => tool.name),
    ...(icon ? { icon } : {}),
    mcpb: {
      url: asset.browser_download_url,
      sha256: createHash("sha256").update(pkg).digest("hex"),
      size: pkg.length,
    },
    releaseTag: release.tag_name,
    releaseDate: release.published_at,
  };
}

const sources = JSON.parse(await readFile(join(ROOT, "sources.json"), "utf8"));
await mkdir(join(ROOT, "icons"), { recursive: true });
const connectors = [];
let failures = 0;
for (const source of sources.connectors) {
  try {
    const connector = await syncConnector(source);
    connectors.push(connector);
    console.log(`ok   ${connector.name}@${connector.version} (${connector.tools.length} tools)`);
  } catch (error) {
    failures += 1;
    console.error(`fail ${source.repo}: ${error.message}`);
  }
}
if (failures > 0 && connectors.length === 0) process.exit(1);
connectors.sort((a, b) => a.displayName.localeCompare(b.displayName));

// Icons of connectors that are no longer listed.
const keep = new Set(connectors.map((c) => c.icon).filter(Boolean).map((p) => p.slice("icons/".length)));
for (const file of await readdir(join(ROOT, "icons"))) {
  if (!keep.has(file) && !file.startsWith(".")) {
    if (CHECK) throw new Error(`icons/${file} would be removed`);
    await rm(join(ROOT, "icons", file));
  }
}

const path = join(ROOT, "marketplace.json");
const previous = existsSync(path) ? JSON.parse(await readFile(path, "utf8")) : null;
const body = {
  $schema: "./marketplace.schema.json",
  schemaVersion: 1,
  name: sources.name,
  displayName: sources.displayName,
  owner: sources.owner,
  homepage: sources.homepage,
  connectors,
};
const unchanged =
  previous && JSON.stringify({ ...previous, updatedAt: undefined }) === JSON.stringify({ ...body, updatedAt: undefined });
const output = { ...body, updatedAt: unchanged ? previous.updatedAt : new Date().toISOString() };
// updatedAt goes right after the header fields for readability.
const ordered = { ...body, updatedAt: output.updatedAt, connectors };
if (!unchanged) {
  if (CHECK) {
    console.error("marketplace.json would change");
    process.exit(1);
  }
  await writeFile(path, `${JSON.stringify(ordered, null, 2)}\n`);
}
console.log(unchanged ? "marketplace.json unchanged" : "marketplace.json updated");
if (failures > 0) process.exitCode = 1;
