# Launch Checklist (Non-Negotiable)

## Build gates (must pass)

- Zero-update verification passes for 3 continuous runs (`npm run verify:stability`)
- Verification run is zero-update clean (`npm run verify:zero-updates`)
- No broken internal links
- Every page has unique title + meta description
- Exactly one H1 per page
- Canonicals correct
- robots + sitemap generated
- License number consistent everywhere (MI License #6220430)
- Forms have labels / accessibility

## Manual checks
- Mobile: sticky bar does not cover submit buttons
- Booking form submits and redirects to /thank-you
- Emergency call CTA works on mobile
- GBP links use UTMs
