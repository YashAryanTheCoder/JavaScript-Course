# jspantry

jspantry is a searchable learning catalog for HTML, CSS, JavaScript libraries, databases, and data structures and algorithms. Follow the ordered tracks, search for a topic, and explore copy-ready examples.

The Taskflow project guide walks through planning, building an accessible React interface, adding an Express and PostgreSQL backend, and testing the finished workflow using the lessons in the catalog.

Lessons include browser compatibility references for evolving standards and newer features. The catalog is curated and does not update automatically, so check the linked references when using recently added APIs.

## Run locally

```sh
npm install
npm run dev
```

Run `npm run build` for a production build or `npm run lint` to check the source.

## Publish on GitHub Pages

After pushing this project to the `JavaScript-Course` repository, run
`npm install` and `npm run build`, then commit the generated `docs` folder. In
GitHub, open **Settings > Pages**, choose **Deploy from a branch**, and select
the `main` branch with the `/docs` folder. The site will be available at
`https://yasharyanthecoder.github.io/JavaScript-Course/` after GitHub Pages
finishes publishing.

The production base path is derived from `GITHUB_REPOSITORY` in GitHub Actions;
local production builds default to `/JavaScript-Course/`. Local development uses
`/` as its base path.
