<h1 align="center">Marketplace de Sunsam Code</h1>

<p align="center">
  <a href="README.md">English</a> · <a href="README.es.md">Español</a> · <a href="README.pt-BR.md">Português</a> · <b>Français</b> · <a href="README.de.md">Deutsch</a> · <a href="README.ru.md">Русский</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a>
</p>

<p align="center">Des connecteurs MCP prêts à installer dans <a href="https://github.com/jhonsu01/SunsamCode">Sunsam Code</a> en un clic, avec icône, description et version. La marketplace se <b>synchronise toute seule</b> avec la dernière release de chaque connecteur.</p>

---

## L’utiliser dans Sunsam Code

Elle est configurée par défaut. Pour l’ajouter à la main (ou ajouter une autre marketplace) :

1. **Paramètres → Serveurs MCP → Marketplaces → Ajouter une marketplace**.
2. Saisissez `jhonsu01/marketplace-SunsamCode` (ou l’URL de n’importe quel `marketplace.json`).
3. Cliquez sur **Installer** sur un connecteur. Quand une nouvelle version sort, **Mettre à jour** apparaît et vos réglages sont conservés.

## Connecteurs

| Connecteur | Ce qu’il fait | Catégorie | Paquet |
| --- | --- | --- | --- |
| <img src="icons/audacity-mcp-server.png" width="20" alt=""> [Audacity Bridge](https://github.com/jhonsu01/audacity-mcp-server) | Audio : découper en morceaux, rogner, convertir, effets, mixer et assembler ; WAV, MP3, FLAC, OGG | Audio | [`audacity-mcp-server.mcpb`](https://github.com/jhonsu01/audacity-mcp-server/releases/latest/download/audacity-mcp-server.mcpb) |
| <img src="icons/designcraft-mcp-server.png" width="20" alt=""> [DesignCraft Bridge](https://github.com/jhonsu01/designcraft-mcp-server) | Mise en page, fusion de données, IDML d'InDesign, PDF/X pour l'impression, PNG, EPUB et HTML | Design | [`designcraft-mcp-server.mcpb`](https://github.com/jhonsu01/designcraft-mcp-server/releases/latest/download/designcraft-mcp-server.mcpb) |
| <img src="icons/effectcraft-mcp-server.png" width="20" alt=""> [EffectCraft Bridge](https://github.com/jhonsu01/effectcraft-mcp-server) | Motion design, titres animés, effets sur vidéos, modèles ; MP4, ProRes, WebM, GIF, Lottie | Design | [`effectcraft-mcp-server.mcpb`](https://github.com/jhonsu01/effectcraft-mcp-server/releases/latest/download/effectcraft-mcp-server.mcpb) |
| <img src="icons/filmcraft-mcp-server.png" width="20" alt=""> [FilmCraft Bridge](https://github.com/jhonsu01/filmcraft-mcp-server) | Montage vidéo : découper, rogner, effets, looks couleur, titres, vitesse, assembler avec transitions ; H.264, ProRes, GIF, OTIO | Design | [`filmcraft-mcp-server.mcpb`](https://github.com/jhonsu01/filmcraft-mcp-server/releases/latest/download/filmcraft-mcp-server.mcpb) |
| <img src="icons/lightcraft-mcp-server.png" width="20" alt=""> [LightCraft Bridge](https://github.com/jhonsu01/lightcraft-mcp-server) | Développement raw : tonalité auto, 114 réglages, préréglages, masques, HDR et panoramas ; JPEG, TIFF, WebP, AVIF, DNG | Design | [`lightcraft-mcp-server.mcpb`](https://github.com/jhonsu01/lightcraft-mcp-server/releases/latest/download/lightcraft-mcp-server.mcpb) |
| <img src="icons/pdfcraft-mcp-server.png" width="20" alt=""> [PdfCraft Bridge](https://github.com/jhonsu01/pdfcraft-mcp-server) | PDF : fusionner, scinder, pages, OCR, formulaires, signatures, caviardage, mots de passe ; vers Word, HTML, images, PDF/A | Productivité | [`pdfcraft-mcp-server.mcpb`](https://github.com/jhonsu01/pdfcraft-mcp-server/releases/latest/download/pdfcraft-mcp-server.mcpb) |
| <img src="icons/photocraft-mcp-server.png" width="20" alt=""> [PhotoCraft Bridge](https://github.com/jhonsu01/photocraft-mcp-server) | Retouche photo : taille, recadrage, réglages, 122 filtres, détourage, texte et créations ; PSD, PNG, JPEG, WebP | Design | [`photocraft-mcp-server.mcpb`](https://github.com/jhonsu01/photocraft-mcp-server/releases/latest/download/photocraft-mcp-server.mcpb) |
| <img src="icons/vectormagic-mcp-server.png" width="20" alt=""> [Vector Magic Bridge](https://github.com/jhonsu01/VectorMagic-mcp-server) | Vectorise des images bitmap, une seule ou des dossiers entiers ; SVG, AI, EPS, PDF, DXF (Windows) | Design | [`vectormagic-mcp-server.mcpb`](https://github.com/jhonsu01/VectorMagic-mcp-server/releases/latest/download/vectormagic-mcp-server.mcpb) |
| <img src="icons/vectorcraft-mcp-server.png" width="20" alt=""> [VectorCraft Bridge](https://github.com/jhonsu01/vectorcraft-mcp-server) | Dessin vectoriel : vectorisation, créations avec formes, texte et graphiques, recoloration ; SVG, PDF, AI, EPS, DXF, PNG | Design | [`vectorcraft-mcp-server.mcpb`](https://github.com/jhonsu01/vectorcraft-mcp-server/releases/latest/download/vectorcraft-mcp-server.mcpb) |
| <img src="icons/wordcraft-mcp-server.png" width="20" alt=""> [WordCraft Bridge](https://github.com/jhonsu01/wordcraft-mcp-server) | Traitement de texte : documents avec titres, listes, tableaux et images, rechercher / remplacer, commentaires, suivi des modifications, publipostage ; DOCX, PDF, ODT, RTF, Markdown, LaTeX | Productivité | [`wordcraft-mcp-server.mcpb`](https://github.com/jhonsu01/wordcraft-mcp-server/releases/latest/download/wordcraft-mcp-server.mcpb) |

La version actuelle de chacun est toujours dans [`marketplace.json`](marketplace.json).

## Autres applications

Les mêmes paquets `.mcpb` s’installent dans **Claude Desktop** (double-clic). Pour **Codex** et **DeepSeek Harness**, les connecteurs Craft sont dans la [marketplace Craft Bridges](https://github.com/jhonsu01/craft-marketplace).

## Fonctionnement

- [`sources.json`](sources.json) liste les dépôts des connecteurs (avec catégorie, couleur et description courte).
- [`scripts/sync.mjs`](scripts/sync.mjs) lit la dernière release de chaque dépôt, télécharge son `.mcpb`, calcule son **SHA-256** et extrait du paquet le `manifest.json` (version, nom, outils) et l’**icône**. Il écrit [`marketplace.json`](marketplace.json) et [`icons/`](icons), sans dépendances.
- Le [workflow](.github/workflows/sync.yml) l’exécute toutes les 6 heures, à la main ou quand un connecteur annonce une nouvelle release :

```bash
gh api repos/jhonsu01/marketplace-SunsamCode/dispatches -f event_type=connector-release
```

- Sunsam Code télécharge le `.mcpb` depuis la release d’origine et **vérifie le SHA-256** avant de l’installer.

### Ajouter un connecteur

Ajoutez son dépôt à `sources.json` (il doit publier un `.mcpb` dans ses GitHub Releases) et lancez `node scripts/sync.mjs`, ou laissez le workflow s’en charger.

### Format

Tout `marketplace.json` conforme à [`marketplace.schema.json`](marketplace.schema.json) sert de marketplace pour Sunsam Code : vous pouvez donc publier la vôtre.

## Licence

Apache-2.0. Chaque connecteur garde sa propre licence. Les applications appartiennent à leurs auteurs ; ces connecteurs ne sont ni affiliés ni approuvés par eux.
