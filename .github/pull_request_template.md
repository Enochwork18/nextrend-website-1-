## Description

<!-- Provide a summary of the changes in this pull request. What problem does it solve or feature does it add? -->

## Related Issues

<!-- Link any related GitHub issues (e.g., Closes #123, Fixes #456). -->

## Changes Made

- [ ] Light/Dark Mode Support (next-themes + Tailwind darkMode class)
- [ ] Added ThemeToggle component in Navbar
- [ ] Added placeholder pages:
  - /privacy → Privacy Policy
  - /terms → Terms of Service
  - /support → Support/FAQ
  - /blog → Blog/Case Studies
- [ ] Fixed Discover Page Suspense error
  - Refactored app/discover/page.tsx → DiscoverContent
  - Added app/discover/layout.tsx with Suspense boundary

## Testing Instructions

1. Run `npm install`
2. Run `npm run dev`
3. Verify:
   - Theme toggle works & persists on reload
   - Placeholder pages (`/privacy`, `/terms`, `/support`, `/blog`) load with correct titles
   - `/discover` works without Suspense errors
   - `npm run build` completes successfully

## Screenshots (if applicable)

<!-- Add before/after screenshots to help reviewers understand changes -->

## Checklist

- [ ] My code follows the project’s coding style
- [ ] I have tested these changes locally
- [ ] I have updated documentation where necessary
- [ ] I have added tests that prove my fix/feature works
- [ ] All tests pass locally
