# Sunsam Code marketplace

[Español](README.md) · **English**

MCP connectors ready to install in [Sunsam Code](https://github.com/jhonsu01/SunsamCode) with one click,
with icon, description and version. The marketplace **syncs itself** with the latest release of every connector.

## Using it in Sunsam Code

It is configured by default. To add it by hand (or add another marketplace):

1. **Settings → MCP servers → Marketplaces → Add marketplace**.
2. Type `jhonsu01/marketplace-SunsamCode` (or the URL of any `marketplace.json`).
3. Click **Install** on a connector. When a new version is out, **Update** appears and your settings are kept.

## Connectors

| Connector                                                                   | Category      |
| --------------------------------------------------------------------------- | ------------- |
| [Audacity Bridge](https://github.com/jhonsu01/audacity-mcp-server)          | Audio         |
| [DesignCraft Bridge](https://github.com/jhonsu01/designcraft-mcp-server)    | Design        |
| [EffectCraft Bridge](https://github.com/jhonsu01/effectcraft-mcp-server)    | Design        |
| [FilmCraft Bridge](https://github.com/jhonsu01/filmcraft-mcp-server)        | Design        |
| [LightCraft Bridge](https://github.com/jhonsu01/lightcraft-mcp-server)      | Design        |
| [PdfCraft Bridge](https://github.com/jhonsu01/pdfcraft-mcp-server)          | Productivity  |
| [PhotoCraft Bridge](https://github.com/jhonsu01/photocraft-mcp-server)      | Design        |
| [Vector Magic Bridge](https://github.com/jhonsu01/VectorMagic-mcp-server)   | Design        |
| [VectorCraft Bridge](https://github.com/jhonsu01/vectorcraft-mcp-server)    | Design        |

The current version of each one is always in [`marketplace.json`](marketplace.json).

## How it works

- [`sources.json`](sources.json) lists the connector repositories (plus category, colour and short description).
- [`scripts/sync.mjs`](scripts/sync.mjs) reads each repo's latest release, downloads its `.mcpb`, computes its
  **SHA-256** and extracts the package's `manifest.json` (version, name, tools) and **icon**. It writes
  [`marketplace.json`](marketplace.json) and [`icons/`](icons), with no dependencies.
- The [workflow](.github/workflows/sync.yml) runs it every 6 hours, manually, or when a connector announces a
  new release:

  ```bash
  gh api repos/jhonsu01/marketplace-SunsamCode/dispatches -f event_type=connector-release
  ```

- Sunsam Code downloads the `.mcpb` from the original release and **verifies the SHA-256** before installing.

### Adding a connector

Add its repository to `sources.json` (it must publish a `.mcpb` in its GitHub Releases) and run
`node scripts/sync.mjs`, or let the workflow do it.

### Format

Any `marketplace.json` that follows [`marketplace.schema.json`](marketplace.schema.json) works as a Sunsam Code
marketplace, so you can publish your own.

## License

Apache-2.0. Each connector keeps its own license.
