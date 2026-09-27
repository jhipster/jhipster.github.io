# AGENTS.md

Instructions for AI agents working on the JHipster website (https://www.jhipster.tech), a Docusaurus site.

## Current documentation versus historical content

The documentation under `docs/` describes the **current** JHipster release only. When a feature, option, tool or
page no longer exists, remove it: do not mark it as deprecated, write about it in the past tense, or add notes
saying it was removed. Older documentation stays available in the archives listed below.

Historical content is the exception. It records the past and must not be edited to match the current release.

### Historical paths — do not modify

- `docs/releases/` — release notes, one file per release (`YYYY-MM-DD-jhipster-release-X.Y.Z.mdx`, served at
  `/YYYY/MM/DD/jhipster-release-X.Y.Z.html`), a few other dated announcements, and the `index.mdx` listing. They
  are hidden from the sidebar. Do not edit them, not even to update a link to a page that was removed.
- The documentation archive, https://www.jhipster.tech/documentation-archive/ — a snapshot of the documentation
  for each release, served at `/documentation-archive/v<version>/` and built from the
  [jhipster/documentation-archive](https://github.com/jhipster/documentation-archive) repository. Older versions
  come from [documentation-archive-v1-to-v5](https://github.com/jhipster/documentation-archive-v1-to-v5) and
  [documentation-archive-v6-to-v7](https://github.com/jhipster/documentation-archive-v6-to-v7).

`docusaurus.config.ts` builds the site as an archive when `IS_DOCS_ARCHIVE=true`: it adds a banner pointing to
the current documentation and sets `noIndex`. Leave that mode in place.

## Removing a page

- Delete the file and remove it from `sidebars.ts` and from any page that lists it.
- Add a redirect from the old URL to the closest current page in `redirects.config.ts`.
- The build fails on broken links (`onBrokenLinks: 'throw'`), and redirects do not count as existing pages. A
  release note that links to the removed page therefore breaks the build. Since release notes must not be
  edited, find another solution before removing a page that release notes link to.

## Building

```bash
npm ci
npm run build -- --locale en
```

This is the same build that runs in CI (`.github/workflows/test-deploy.yml`).
