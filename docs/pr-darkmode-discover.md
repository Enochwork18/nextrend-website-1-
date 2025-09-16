# 🚀 Pull Request: Dark Mode, Discover Fix, and Placeholder Pages

## Summary

This pull request introduces several key features and a critical bug fix:

### Light/Dark Mode Support
* Integrated `next-themes` with Tailwind CSS (`darkMode: "class"`) to provide consistent light and dark themes across the application.  
* Added `ThemeToggle` component to the Navbar.  
* User preferences persist in `localStorage`.  

### New Placeholder Pages
* `/privacy` → Privacy Policy  
* `/terms` → Terms of Service  
* `/support` → Support/FAQ  
* `/blog` → Blog/Case Studies  

### Discover Page Fix
* Refactored the `/discover` page to resolve a build error caused by `useSearchParams()` without a Suspense boundary.  
* Moved page logic into a new client component.  
* Introduced a layout with a Suspense wrapper.  

---

## Modified Files
- `app/discover/page.tsx` → Refactored to load `DiscoverContent`.  
- `app/discover/discover-content.tsx` (New) → Contains primary search, filter, and display logic.  
- `app/discover/layout.tsx` (New) → Provides Suspense boundary.  
- `components/theme-toggle.tsx` (New) → Button for switching light/dark themes.  
- `app/privacy/page.tsx` (New) → Privacy Policy placeholder.  
- `app/terms/page.tsx` (New) → Terms of Service placeholder.  
- `app/support/page.tsx` (New) → Support/FAQ placeholder.  
- `app/blog/page.tsx` (New) → Blog/Case Studies placeholder.  

---

## Setup Instructions
1. Install dependencies:  
   ```bash
   npm install
   ```
2. Run the dev server:  
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000).

---

## Testing Notes
* **Theme Toggle:** Switch between light/dark mode and confirm persistence after reload.  
* **Placeholder Pages:** Visit `/privacy`, `/terms`, `/support`, `/blog` to check placeholder rendering.  
* **Discover Page:** Confirm no runtime errors, search + filters work.  
* Run `npm run build` → build should succeed.  

---

## 📜 Changelog

### v1.0 – Initial Refactor
* Set up `.gitignore`, `README.md`, `.env.example`.  
* Added ESLint + Prettier configs.  
* Created GitHub Actions CI workflow.  
* Introduced mock data in `lib/mockData.ts`.  
* Added TypeScript types for Discover + Auth.  
* Implemented mock authentication (localStorage).  
* Created `/profile` page and updated Navbar.  

### v1.1 – Dark Mode + Discover Fix
* Added light/dark theme support with `next-themes`.  
* Created `ThemeToggle` component in Navbar.  
* Added placeholder pages: `/privacy`, `/terms`, `/support`, `/blog`.  
* Refactored `/discover` page to use Suspense boundary.  
* Fixed build error caused by `useSearchParams()`.  

### v1.2 – Coming Soon
* Planned: Billing/Profile mock flows and further enhancements.  

---
