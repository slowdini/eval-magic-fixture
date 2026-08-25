# Weeknight

Weeknight is a small local-first meal-planning web app. It is also the default example codebase for
[`eval-magic`](https://github.com/slowdini/eval-magic), with enough structure for realistic coding
tasks while remaining compact enough to install, test, and understand in one session.

## Quickstart

Weeknight requires Node.js 24 or later. The `.nvmrc` file selects the supported major version for
Node version managers that recognize it.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. The app stores its plan and shopping-list state in browser local
storage; it does not require a backend or external service.

## Core workflow

- Search or filter the six-recipe catalog and open a recipe for its ingredients and instructions.
- Schedule one recipe per weekday and adjust the serving count.
- Generate a shopping list whose ingredient quantities are scaled and combined across the plan.
- Check off shopping-list items without losing the plan after a page reload.

## Development

Run the same checks used by continuous integration:

```sh
npm test
npm run typecheck
npm run build
npm run lint
```

The codebase uses React, TypeScript, Vite, Vitest, Testing Library, ESLint, and Prettier. Domain
logic lives in `src/domain/`, recipe data in `src/data/`, page-level components in `src/pages/`, and
application wiring in `src/app/`.

## Using this repository as an eval fixture

The default `eval-magic init` output pins this repository to a commit, so each generated workspace
starts from a reproducible baseline. To use another revision explicitly, replace
`FULL_COMMIT_SHA` in this eval-file declaration:

```json
{
  "codebase": {
    "url": "https://github.com/slowdini/eval-magic-fixture",
    "ref": "FULL_COMMIT_SHA"
  }
}
```

See `eval-magic docs codebase` for the complete codebase-source contract and local-path options.

## License

This project is available under the [MIT License](LICENSE).
