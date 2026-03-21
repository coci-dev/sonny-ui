# Contributing to SonnyUI

Thanks for your interest in contributing to SonnyUI! Here's how to get started.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sonny-ui.git
   cd sonny-ui
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the library:
   ```bash
   npm run build
   ```
5. Start the docs site:
   ```bash
   npm run docs:dev
   ```

## Development Workflow

1. Create a new branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
2. Make your changes
3. Run tests:
   ```bash
   npm test
   ```
4. Commit your changes following the [commit conventions](#commit-conventions)
5. Push to your fork and open a Pull Request

## Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `refactor:` — code refactoring
- `test:` — adding or updating tests
- `chore:` — maintenance tasks

Examples:
```
feat: add tooltip component
fix: correct button loading state alignment
docs: update installation instructions
```

## Pull Request Guidelines

- Keep PRs focused on a single change
- Update documentation if needed
- Add tests for new features
- Make sure all status checks pass
- Fill out the PR template

## Adding a New Component

1. Create a folder under `projects/core/src/lib/`
2. Create the variants file with `cva()`
3. Create the directive/component using Angular signals
4. Create an `index.ts` barrel file
5. Export from `public-api.ts`
6. Add a documentation page in `projects/docs/`
7. Write tests

## Code Style

- Use Angular signal inputs (`input()`) instead of decorators
- Use `computed()` for derived state
- Prefer directives over components when possible
- Use `class-variance-authority` for variant definitions
- All components must be standalone
- No zone.js dependency

## Questions?

Open an [issue](https://github.com/coci-dev/sonny-ui/issues) and we'll help you out.
