<!-- markdownlint-disable MD041 MD033 MD013 -->

<p align="center">
  <img
    src="https://raw.githubusercontent.com/landerox/zensical-slate-theme/main/zensical_slate_theme/assets/images/banner.svg"
    width="460"
    alt="zensical-slate-theme Banner"
  />
</p>

<p align="center">
  <!-- markdownlint-disable MD013 -->
  <a href="https://github.com/landerox/zensical-slate-theme/actions/workflows/deploy.yml"><img src="https://github.com/landerox/zensical-slate-theme/actions/workflows/deploy.yml/badge.svg" alt="Deploy" /></a>
  <a href="https://github.com/landerox/zensical-slate-theme/actions/workflows/ci.yml"><img src="https://github.com/landerox/zensical-slate-theme/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="pyproject.toml"><img src="https://img.shields.io/badge/version-0.1.1-blue" alt="Version" /></a>
  <a href="https://pypi.org/project/slate-theme/"><img src="https://img.shields.io/pypi/v/slate-theme.svg?logo=pypi&logoColor=white" alt="PyPI Version" /></a>
  <a href="pyproject.toml"><img src="https://img.shields.io/badge/python-3.13%2B-blue?logo=python&logoColor=white" alt="Python" /></a>
  <a href="https://github.com/zensical/zensical"><img src="https://img.shields.io/badge/Zensical-0.0.45-FF9100" alt="Zensical" /></a>
  <br />
  <a href="https://landerox.github.io/zensical-slate-theme/"><img src="https://img.shields.io/badge/demo-live_demo-success?logo=github&logoColor=white" alt="Live Demo" /></a>
  <a href=".devcontainer"><img src="https://img.shields.io/static/v1?label=Dev%20Containers&message=Supported&color=blue&logo=visualstudiocode&logoColor=white" alt="Dev Containers" /></a>
  <a href="https://github.com/pre-commit/pre-commit"><img src="https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white" alt="pre-commit" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/code%20license-MIT-green" alt="Code License: MIT" /></a>
  <a href="LICENSE-CONTENT"><img src="https://img.shields.io/badge/content%20license-CC%20BY%204.0-lightgrey" alt="Content License: CC BY 4.0" /></a>
  <!-- markdownlint-enable MD013 -->
</p>

This repository is a hybrid **Packaged Theme + Starter Template** built on
top of the modern, Rust-powered [Zensical](https://zensical.org) static site
generator. It provides a highly interactive developer portfolio theme
(`zensical-slate-theme`) and a pre-configured starter layout so you can
customize and launch your site in minutes.

Designed for developers, technical writers, and creators who want a stunning,
high-performance bilingual portfolio and blog site with robust,
production-grade quality controls and automated CI/CD out of the box.

<p align="center">
  <img
    src="https://raw.githubusercontent.com/landerox/zensical-slate-theme/main/content/en/assets/images/zensical-slate-theme-preview.webp"
    width="800"
    alt="zensical-slate-theme Live Preview"
  />
</p>

---

## 🌟 Key Features

* **Sleek Slate Aesthetics**: Deep graphite base (`#0b0f19`) and tailored
  indigo/slate accents for a modern, polished developer aesthetic.
* **Interactive Neural Background**: Canvas particle system connecting nodes
  with lines that respond smoothly to mouse movements.
* **circular Page Ripple**: A gorgeous ripple transition triggered when
  toggling light/dark modes (fully respects `prefers-reduced-motion`).
* **3D Glare Tilt Cards**: Project and experience cards that tilt dynamically
  in response to mouse coordinates with a glassmorphism reflection overlay.
* **Complete Bilingual Support (EN/ES)**: Built-in layout for English at `/`
  and Spanish at `/es/` with full relative path and structure symmetry.
* **Automated CI/CD Workflows**: Hand-crafted GitHub Actions for deploying
  compiles to GitHub Pages, link validation, and automated dependency
  upgrades.
* **Elite Security & Quality Standards**: Pre-configured pre-commit hooks for
  markdown lints, spellchecking (`cspell`), secrets detection (`gitleaks`),
  dependency auditing (`pip-audit`), and GitHub action security (`zizmor`).

---

## 🚀 Quick Start

You can get your site up and running in minutes using one of the following
options:

### Option 1: Dev Container (Recommended)

This repository includes a fully configured **Dev Container** (VS Code /
GitHub Codespaces) with Python 3.13, `uv`, `just`, and all linter binaries
pre-installed.

1. Click the green **"Use this template"** button to create your clone on
   GitHub.
2. Open your new repository in VS Code.
3. Click the notification **"Reopen in Container"** (or press `F1`, type
   `Dev Containers: Reopen in Container`).
4. Once loaded, open a terminal inside VS Code and run:

   ```bash
   just serve
   ```

5. Open [http://localhost:8000](http://localhost:8000) to see your website!

### Option 2: Local Manual Setup

If you prefer to install dependencies directly on your host machine:

**Prerequisites:**

* Python 3.13+
* [`uv`](https://docs.astral.sh/uv/) (Python package manager)
* [`just`](https://github.com/casey/just) (command runner)

**Setup:**

```bash
# 1. Install all dependencies and setup the virtual environment
just sync

# 2. Install pre-commit quality hooks
just hooks-install

# 3. Start the English development server (port 8000)
just serve

# 4. Start the Spanish development server (port 8001)
just serve-es
```

### Option 3: Use as a Reusable Theme on an Existing Project

If you already have an existing Zensical site and simply want to apply the
**Slate Theme**:

1. **Install the package** from [PyPI](https://pypi.org/project/slate-theme/):

   Using `uv`:

   ```bash
   uv add slate-theme
   ```

   Using `pip`:

   ```bash
   pip install slate-theme
   ```

   *Alternatively, you can install the latest development version directly
   from GitHub:*

   ```bash
   pip install git+https://github.com/landerox/zensical-slate-theme.git
   ```

2. **Configure your site** to load the theme inside your `zensical.toml`:

   ```toml
   [project.theme]
   name = "slate"
   ```

   > [!NOTE]
   > **Zero-Configuration Asset Injection:** You do NOT need to declare
   > `extra_css` or `extra_javascript` in your `zensical.toml` to load the
   > Slate theme's stylesheets and scripts. The theme uses built-in layout
   > inheritance (`main.html`) to inject them automatically.

---

## 📦 Repository Structure

The project is architected as a hybrid repository to give you the benefits of
a packaged, reusable theme alongside a clean, local starter workspace:

* **`zensical_slate_theme/`**: The core, reusable Python theme package
  containing the slate design assets (`extra.css`, `extra.js`), default
  graphics (logos, profile, banner, theme preview), layout template overrides
  (`main.html`), and theme configurations (`mkdocs_theme.yml`).
* **`content/`**: Your website's content source directory.
  * `content/en/`: English Markdown pages and blog posts.
  * `content/en/assets/`: Optional directory where you can place custom
    overrides (e.g., your own profile picture, logo, or custom stylesheets).
  * `content/es/`: Spanish Markdown pages and blog posts.
* **`zensical.toml` / `zensical.es.toml`**: The site settings for English and
  Spanish builds, both referencing the packaged `"slate"` theme.
* **`Justfile`**: Simple commands to run your dev server, linting suite, and
  site compilation.

---

## 🛠️ Customization Guide

Personalizing the site is straightforward:

1. **Global Site Config**: Open `zensical.toml` (English) and
   `zensical.es.toml` (Spanish) to update the site title, description, social
   links, and author details.
2. **Generic Placeholders**: We've pre-loaded home pages
   (`content/en/index.md` and `content/es/index.md`) with braces-style
   placeholders like `{Your Name}` or `{Your Specialty}`. Swap these out for
   your real info.
   * *Note: Avoid plain square brackets like `[Placeholder]` without a link,
     as Zensical interprets them as unresolved markdown link references. Use
     curly braces `{Placeholder}` instead.*
3. **Bilingual & Custom Assets (DRY)**: The core theme styles, scripts, and
   default graphics reside within the packaged theme directory
   (`zensical_slate_theme/assets/`). If you want to customize your site's
   graphics, stylesheet tweaks, or scripts:
   * Place your custom overrides inside `content/en/assets/` (e.g., your own
     profile picture at `content/en/assets/images/profile.svg` or custom
     stylesheets). They will automatically take precedence over the packaged
     theme defaults.
   * Never edit files in `content/es/assets/` directly! During development or
     builds, `just sync-assets` automatically synchronizes your English asset
     overrides to the Spanish assets folder.
4. **Content Symmetry**: Every page or blog post under `content/en/` must have
   a relative-path counterpart under `content/es/`. Run the bilinguality
   validator to verify alignment:

   ```bash
   python3 scripts/check_i18n.py
   ```

---

## 🌍 Automated Deployment

We have included a pre-configured GitHub Actions deployment workflow
(`.github/workflows/deploy.yml`) to compile and publish your site
automatically.

1. Go to your repository settings on GitHub: **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Push your changes to the `main` branch, and the site will build and deploy
   to GitHub Pages instantly!

---

## 👥 Contributing

While this repository serves as a starter template and packaged theme,
technical corrections, bug reports, or suggestions are highly appreciated.
Please refer to the [Contributing Guidelines](.github/CONTRIBUTING.md) before
opening an Issue or submitting a Pull Request.

---

## 📄 License

To maintain a clear boundary between the open-source engine and the theme's
core assets or template content, this repository operates under a dual-license
model:

* **Source Code** (`pyproject.toml`, `.github/`, scripts, tooling
  configurations) is released under the [MIT License](LICENSE).
* **Starter Template Content** (Markdown files under `content/`, default demo
  images, and placeholder prose) is released under the [Creative Commons
  Attribution 4.0 International License (CC-BY-4.0)](LICENSE-CONTENT).
