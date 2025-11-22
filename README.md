# Matins · Mind Mapping for natural writing

Matins is a flexible mind-mapping surface with multiple starting nodes, quick keyboard actions
(vimperator-style), and friendly mouse interactions. The project follows a collaborative BDD/TDD
loop: feature scenarios are first written in Gherkin, then automated tests drive the implementation.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: vanilla CSS (App/index styles)
- **Testing**: Playwright (`tests/app.smoke.spec.ts`) with a Vite-powered dev server
- **Quality gates**: ESLint (flat config), Husky + lint-staged pre-commit hooks, GitHub Actions CI

## Getting Started

```bash
npm install
npm run dev
```

The dev server opens on http://localhost:5173 by default (`vite.config.ts` sets `open: true`).

## NPM Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Type-check (`tsc -b`) and emit optimized production build |
| `npm run preview` | Preview the production bundle locally |
| `npm run lint` | Run ESLint against `src/**/*.{ts,tsx}` |
| `npm run lint:fix` | ESLint with auto-fixes |
| `npm run test:e2e` | Playwright cross-browser smoke suite (spins up dev server automatically) |
| `npm run test:e2e:ui` | Playwright UI mode for exploratory runs |

### Pre-commit safety net

Husky installs automatically via the `prepare` script. On every `git commit`, lint-staged
formats and lints changed `.ts/.tsx` files using ESLint before the commit is recorded.

## Testing and CI

1. **Local E2E**: `npm run test:e2e` (chromium, firefox, webkit). Reports land in `playwright-report/`.
2. **Continuous Integration**: `.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, `npm run build`,
   and the Playwright suite on push / pull requests targeting `main`. Reports and test-results are
   uploaded as artifacts for postmortem debugging.

## Development workflow (BDD + TDD)

1. **Feature definition** – Author a Gherkin scenario in `features/` describing the desired behavior.
2. **Test-first** – Translate that scenario into automated tests (Playwright, component/unit tests, etc.).
3. **Implementation** – Build only enough UI/logic to satisfy the failing tests.
4. **Refine & repeat** – Iterate on ergonomics (keyboard shortcuts, node management) backed by tests.

## Next steps

- Capture the first official user journey in a `.feature` file (multiple starting nodes, node creation flow).
- Flesh out component structure (state for graph, keyboard command palette, mouse gestures).
- Add unit-level coverage for state helpers once the core graph model emerges.
- Expand README with architecture decisions as they solidify.

---

For more context see `config/prompt.md`, which documents the collaboration charter and core requirements.

