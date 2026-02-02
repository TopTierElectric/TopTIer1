# Forms Baseline

## Summary
The site has three HTML forms that submit to a placeholder Formsubmit endpoint and do not include explicit spam controls or on-site confirmation handling.

## Form inventory

### Home hero form (index.html)
- Action: `https://formsubmit.co/your-email@example.com`
- Method: POST
- Required fields: name, email
- CTA: "Request a Clear Estimate"
- Confirmation UX: relies on Formsubmit default confirmation page (no on-page success state).
- Spam controls: none (no honeypot, Turnstile, or server-side validation in repo).

### Booking form (booking.html)
- Action: `https://formsubmit.co/your-email@example.com`
- Method: POST
- Required fields: name, email, phone, service, preferred date, preferred time
- Optional fields: notes
- CTA: "Schedule Service"
- Confirmation UX: relies on Formsubmit default confirmation page (no on-page success state).
- Spam controls: none.

### Contact form (contact.html)
- Action: `https://formsubmit.co/your-email@example.com`
- Method: POST
- Required fields: name, email, message
- CTA: "Request a Quote"
- Confirmation UX: relies on Formsubmit default confirmation page (no on-page success state).
- Spam controls: none.

## Known submission path
- Client posts directly to Formsubmit. No server-side validation in repo.

## Risks noted
- Placeholder endpoint suggests forms are not wired for production.
- No anti-spam controls beyond browser validation.
