import react from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

// https://vitejs.dev/config/
export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    printWidth: 100,
    trailingComma: "all",
    tabWidth: 2,
    semi: true,
    singleQuote: false,
    bracketSpacing: true,
    arrowParens: "always",
    sortImports: {
      groups: [
        "type",
        "builtin",
        "external",
        ["internal", "subpath"],
        "parent",
        "sibling",
        "index",
        "style",
        "unknown",
      ],
    },
    sortTailwindcss: true,
  },
  lint: {
    plugins: ["typescript", "unicorn"],
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
    categories: {
      correctness: "error",
    },
    env: {
      browser: true,
      node: true,
      serviceworker: true,
      builtin: true,
    },
    globals: {
      AudioWorkletGlobalScope: "readonly",
      AudioWorkletProcessor: "readonly",
      close: "writable",
      currentFrame: "readonly",
      currentTime: "readonly",
      postMessage: "writable",
      registerProcessor: "readonly",
      sampleRate: "readonly",
      WorkletGlobalScope: "readonly",
      applicationCache: "readonly",
      FileReaderSync: "readonly",
      onconnect: "writable",
      ServiceWorkerMessageEvent: "readonly",
    },
    ignorePatterns: ["node_modules", "dist", "coverage", ".idea"],
    rules: {
      "no-array-constructor": "error",
      "no-console": [
        "warn",
        {
          allow: ["error"],
        },
      ],
      "no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_.*?$",
          caughtErrorsIgnorePattern: "^_.*?$",
        },
      ],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "typescript/ban-ts-comment": "off",
      "typescript/no-empty-object-type": "error",
      "typescript/no-explicit-any": "off",
      "typescript/no-namespace": "off",
      "typescript/no-require-imports": "error",
      "typescript/no-unnecessary-type-constraint": "error",
      "typescript/no-unsafe-function-type": "error",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
        rules: {
          "constructor-super": "off",
          "getter-return": "off",
          "no-class-assign": "off",
          "no-const-assign": "off",
          "no-dupe-class-members": "off",
          "no-dupe-keys": "off",
          "no-func-assign": "off",
          "no-import-assign": "off",
          "no-new-native-nonconstructor": "off",
          "no-obj-calls": "off",
          "no-redeclare": "off",
          "no-setter-return": "off",
          "no-this-before-super": "off",
          "no-undef": "off",
          "no-unreachable": "off",
          "no-unsafe-negation": "off",
          "no-with": "off",
        },
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  plugins: lazyPlugins(() => [react()]),
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api-rubber-hono.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
    },
  },
});
