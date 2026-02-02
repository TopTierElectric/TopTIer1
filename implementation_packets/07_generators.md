# Generators (/generators.html)

## Exact Problem
Generator service page was missing despite service mention.

## Why it matters
Dedicated page is needed for safe backup power education and lead capture.

## Exact Fix
Created generator page with sizing basics, transfer equipment, process, included/excluded, FAQs, and Service + FAQPage schema.

## Where to apply
generators.html

## Acceptance Criteria
Page exists with single H1, 10 FAQs, Service + FAQPage schema.

## Verification Steps
- rg "Generator" generators.html
- rg "FAQPage" generators.html
