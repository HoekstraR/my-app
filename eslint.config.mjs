import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // XSS tripwire: forbid dangerouslySetInnerHTML. AI-generated apps
      // typically render user input or external data — raw HTML injection
      // is almost never intentional. If you have a real need, opt out
      // with a per-file override in this config.
      "react/no-danger": "error",
    },
  },
];

export default eslintConfig;
