# AGENTS.md

## Cursor Cloud specific instructions

SolarDOM is a standalone, pure-TypeScript library (a custom DOM/Web IDL implementation). There is no server, database, frontend, or external service — "running" it means executing the entry point and its unit tests in a single process.

### Runtime / package manager

- The package manager and runtime is **Bun** (lockfile is `bun.lock`). Do not use npm/yarn/pnpm.
- Bun is installed at `~/.bun/bin/bun` and added to `PATH` via `~/.bashrc`. In a non-login shell where `bun` is not found, invoke it with the full path `~/.bun/bin/bun`.

### Common commands

- Test: `bun run test` (Vitest). Do **not** run `bun test` — that invokes Bun's built-in test runner instead of Vitest (see `README.md`).
  - For a single non-watch run, use `bun run test --run`.
- Run entry point: `bun run index.ts`.

### Notes / gotchas

- There is **no `build` or `lint` script**. `package.json` defines only `test`.
- Running the TypeScript compiler (`bunx tsc`) currently reports type errors in `src/Document.ts`, `src/Element.ts`, and `src/Node.ts` (the DOM interfaces are only partially implemented — this is a work in progress, not an environment problem). Tests still pass because Vitest transpiles without full type-checking.
