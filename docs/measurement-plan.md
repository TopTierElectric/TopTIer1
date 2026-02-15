# Measurement Plan — Top Tier Electrical

## North Star
Win West Michigan demand by dominating:
- GBP visibility (Maps)
- Organic rankings (service + city intent)
- AEO / AI visibility
- Highest conversion rate + lowest lead cost

## Weekly KPIs (Scorecard)
### Lead / Revenue
- Calls (unique + qualified)
- Booking form submissions
- Contact form submissions
- Lead -> Job conversion rate (if CRM exists)

### Local Search (GBP)
- Calls, website clicks, direction requests, message starts
- Map pack positions for:
  - electrician + {city}
  - electrical panel upgrade + {city}
  - EV charger install + {city}
  - generator install + {city}
  - electrical repair + {city}
- Reviews: velocity (new/wk), rating, keyword mentions

### Organic SEO (GSC)
- Clicks, impressions, CTR, avg position by page type:
  - service pages
  - city pages
- Index coverage
- CWV status

### Website Performance
- CWV: LCP, CLS, INP
- Lighthouse (mobile): Performance / Accessibility / Best Practices / SEO

## Event Contract (GA4)
### Primary conversions
- generate_lead_call
- generate_lead_booking_submit
- generate_lead_contact_submit

### Secondary conversions
- booking_cta_click
- service_cta_click
- emergency_call_click

### Required parameters on all events
- page_type: home|services|service|city|blog|about|contact|booking|gallery|faq|emergency|reviews|testimonials|financing|residential|commercial
- service: panel_upgrades|ev_chargers|generators|lighting|repairs|dedicated_circuits|code_corrections|none
- city: grand_rapids|holland|muskegon|grand_haven|allegan|none
- cta_location: header|hero|sticky|footer|inline
- method: tel|sms|form|link

### Scroll depth events
- scroll_50
- scroll_75
- scroll_90

### Behavior events
- faq_toggle
- form_start
- form_error
