<!-- markdownlint-disable MD041 MD033 MD013 -->

<p align="center">
  <img
    src="https://raw.githubusercontent.com/landerox/zensical-slate-theme/main/zensical_slate_theme/assets/images/banner.svg"
    width="460"
    alt="zensical-slate-theme Banner"
  />
</p>

<p align="center">
  <a href="https://github.com/landerox/zensical-slate-theme"><img src="https://img.shields.io/badge/GitHub-Repository-blue?logo=github&logoColor=white" alt="GitHub Repository" /></a>
  <a href="https://pypi.org/project/slate-theme/"><img src="https://img.shields.io/pypi/v/slate-theme.svg?logo=pypi&logoColor=white" alt="PyPI Version" /></a>
  <a href="https://pypi.org/project/slate-theme/"><img src="https://img.shields.io/pypi/pyversions/slate-theme.svg?logo=python&logoColor=white" alt="Python Support" /></a>
  <a href="https://github.com/landerox/zensical-slate-theme/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="License: MIT" /></a>
</p>

---

# Zensical Theme Slate

`slate-theme` is a sleek, developer-focused, and highly interactive bilingual portfolio and blog theme packaged for [Zensical](https://zensical.org) (the modern, Rust-powered static site generator built on top of MkDocs).

This package contains the core compiled design assets and templates so you can apply the polished **Slate Theme** directly to any existing Zensical website with zero-configuration setup.

<p align="center">
  <img
    src="https://raw.githubusercontent.com/landerox/zensical-slate-theme/main/content/en/assets/images/zensical-slate-theme-preview.webp"
    width="800"
    alt="zensical-slate-theme Live Preview"
  />
</p>

---

## 🌟 Key Theme Features

* **Sleek Slate Aesthetics:** Deep graphite base (`#0b0f19`) and tailored indigo/slate accents for a premium technical look.
* **Interactive Neural Background:** Canvas particle system connecting nodes with lines that respond smoothly to mouse movements.
* **Circular Page Ripple:** A gorgeous ripple transition triggered when toggling light/dark modes (fully respects `prefers-reduced-motion`).
* **3D Glare Tilt Cards:** Project and experience cards that tilt dynamically in response to mouse coordinates with a glassmorphism reflection overlay.
* **Zero-Configuration Asset Injection:** Automated asset injection via layout overrides, loading styles and scripts natively without configuration boilerplate.

---

## 🚀 Installation & Usage

You can apply the Slate theme to your Zensical project in two simple steps:

### 1. Install the Package

Add the package to your project's virtual environment using `uv` (recommended):

```bash
uv add slate-theme
```

Or using standard `pip`:

```bash
pip install slate-theme
```

### 2. Configure Your Theme

Update your `zensical.toml` (and `zensical.es.toml` if your site is bilingual) to load the packaged theme:

```toml
[project.theme]
name = "slate"
```

> [!NOTE]
> **Zero-Configuration Setup:** You do NOT need to declare `extra_css` or `extra_javascript` configurations in your site configuration file to load the theme's core stylesheets and scripts. The package handles this natively via layout template inheritance.

---

## 🎨 Starter Template

If you are starting a new website from scratch, this repository also serves as a complete **Bilingual Starter Pack**.

Instead of configuring everything manually, you can use the pre-configured starter layout, multi-language structure (English and Spanish), and automated deployment workflows.

Visit the **[Official GitHub Repository](https://github.com/landerox/zensical-slate-theme)** for cloning instructions, manual setup steps, and the full bilingual customization guide.

---

## 📄 License

To maintain a clear boundary between the open-source engine and the theme's core assets or template content, this repository operates under a dual-license model:

* **Source Code** (`pyproject.toml`, `.github/`, scripts, tooling configurations) is released under the [MIT License](https://github.com/landerox/zensical-slate-theme/blob/main/LICENSE).
* **Starter Template Content** (Markdown files under `content/`, default demo images, and placeholder prose) is released under the [Creative Commons Attribution 4.0 International License (CC-BY-4.0)](https://github.com/landerox/zensical-slate-theme/blob/main/LICENSE-CONTENT).
