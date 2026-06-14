/**
 * ESLint Flat Configuration (v9+)
 * For linting client-side JavaScript assets without external build dependencies.
 */
export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        // Browser environment globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
        Image: "readonly",
        customElements: "readonly",
        HTMLElement: "readonly",
        // Audio & Canvas APIs
        AudioContext: "readonly",
        CanvasRenderingContext2D: "readonly",
        // Material for MkDocs instant-loading global observable
        document$: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "off",
      "no-constant-condition": "warn",
      "no-empty": "warn",
    },
  },
];
