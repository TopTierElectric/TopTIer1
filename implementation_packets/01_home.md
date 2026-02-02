# Home Page (/index.html)

## Exact Problem
Home page content included unverifiable claims and lacked updated SEO structure and FAQs.

## Why it matters
Homepage is the primary entry point and must match verified messaging while supporting service discovery and internal linking.

## Exact Fix
Updated title/meta, H1, section order, services grid, proof links, service area content, added FAQs + FAQPage schema, and removed unverifiable claims.

## Where to apply
index.html

## Acceptance Criteria
One H1, required sections in order, service links to all service pages, FAQ section visible, LocalBusiness + FAQPage schema present.

## Verification Steps
- rg "<title>" index.html
- rg "FAQPage" index.html
- rg "service-card" index.html
