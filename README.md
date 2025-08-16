# ☀️ SolarDOM

A custom DOM implementation, inspired by [jsdom](https://github.com/jsdom/jsdom) and [happy-dom](https://github.com/capricorn86/happy-dom)

## Installation

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.14. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Testing

```bash
# Use this instead of `bun test` since that uses Bun's own test runner
bun run test
```

TODO: setup separate test suites for WebIDL (structural) and DOM behavior (logic)
Use WPT test suites
