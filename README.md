# Marketplace de Sunsam Code

**Español** · [English](README.en.md)

Conectores MCP listos para instalar en [Sunsam Code](https://github.com/jhonsu01/SunsamCode) con un clic,
con icono, descripción y versión. El marketplace se **sincroniza solo** con el último release de cada conector.

## Usarlo en Sunsam Code

Viene configurado por defecto. Para añadirlo a mano (o añadir otro marketplace):

1. **Ajustes → Servidores MCP → Marketplaces → Añadir marketplace**.
2. Escribe `jhonsu01/marketplace-SunsamCode` (o la URL de cualquier `marketplace.json`).
3. Pulsa **Instalar** en un conector. Cuando sale una versión nueva aparece **Actualizar**, y tu
   configuración se conserva.

## Conectores

| Conector                                                                    | Categoría     |
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

La versión vigente de cada uno está siempre en [`marketplace.json`](marketplace.json).

## Cómo funciona

- [`sources.json`](sources.json) lista los repositorios de conectores (más categoría, color y descripción corta).
- [`scripts/sync.mjs`](scripts/sync.mjs) lee el último release de cada repo, descarga su `.mcpb`, calcula su
  **SHA-256** y extrae de dentro del paquete el `manifest.json` (versión, nombre, herramientas) y el **icono**.
  Escribe [`marketplace.json`](marketplace.json) e [`icons/`](icons). No usa dependencias.
- El [workflow](.github/workflows/sync.yml) lo ejecuta cada 6 horas, a mano o cuando un conector avisa de un
  release nuevo:

  ```bash
  gh api repos/jhonsu01/marketplace-SunsamCode/dispatches -f event_type=connector-release
  ```

- Sunsam Code descarga el `.mcpb` desde el release original y **comprueba el SHA-256** antes de instalarlo.

### Añadir un conector

Añade su repositorio a `sources.json` (debe publicar un `.mcpb` en sus GitHub Releases) y ejecuta
`node scripts/sync.mjs`, o deja que lo haga el workflow.

### Formato

Cualquier `marketplace.json` que siga [`marketplace.schema.json`](marketplace.schema.json) sirve como
marketplace para Sunsam Code: así puedes publicar el tuyo.

## Licencia

Apache-2.0. Cada conector conserva su propia licencia.
