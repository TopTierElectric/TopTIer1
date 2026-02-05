# Lighthouse Baseline

## Scope

Target pages:

- /
- /services.html
- /booking.html
- /contact.html
- /panel-upgrades.html
- /emergency.html

## Commands attempted

```bash
npx lighthouse http://localhost:8888/ --output json --output-path reports/lighthouse/home.mobile.json --form-factor=mobile --chrome-flags="--headless --no-sandbox" --quiet
npx lighthouse http://localhost:8888/ --output json --output-path reports/lighthouse/home.desktop.json --preset=desktop --chrome-flags="--headless --no-sandbox" --quiet
```

## Result

- Lighthouse could not run because Chrome/Chromium is not available in the environment.
- Error observed: `CHROME_PATH environment variable must be set to a Chrome/Chromium executable`.

## Baseline metrics (pending)

| Page                 | Form factor | Performance | Accessibility | Best Practices | SEO | LCP | INP | CLS | Notes                |
| -------------------- | ----------- | ----------- | ------------- | -------------- | --- | --- | --- | --- | -------------------- |
| /                    | Mobile      | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |
| /                    | Desktop     | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |
| /services.html       | Mobile      | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |
| /services.html       | Desktop     | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |
| /booking.html        | Mobile      | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |
| /booking.html        | Desktop     | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |
| /contact.html        | Mobile      | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |
| /contact.html        | Desktop     | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |
| /panel-upgrades.html | Mobile      | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |
| /panel-upgrades.html | Desktop     | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |
| /emergency.html      | Mobile      | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |
| /emergency.html      | Desktop     | N/A         | N/A           | N/A            | N/A | N/A | N/A | N/A | Chrome not available |

## Next step

- Provide Chrome/Chromium path or run Lighthouse in an environment with Chrome installed. Then regenerate JSON outputs in `reports/lighthouse/` and update this table.
