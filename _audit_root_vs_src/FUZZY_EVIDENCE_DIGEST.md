# FUZZY Evidence Digest

- Total fuzzy candidates (excluding header): **23**

- Evidence dirs: `fuzzy_diffs/` and `fuzzy_byte_diffs/`


## 1. `testimonials.html` → `pages/testimonials.html`

- Score: **1.2811**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/testimonials.html__TO__pages_testimonials.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/testimonials.html__TO__pages_testimonials.html.cmp.txt`

- Unified diff line delta: **+300 / -350**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/testimonials.html b/tmp/tmp.cS0l193Uwl/src_version/pages/testimonials.html
index 9bcfcc1..2c38262 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/testimonials.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/testimonials.html
@@ -1,381 +1,331 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <title>Professional Standards | Top Tier Electrical</title>
-    <meta
-      name="description"
-      content="Top Tier Electrical professional standards: clear scope, options explained, owner-operated communication, and clean code-correct execution."
-    />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-  </head>
-  <body>
-    <header class="site-header">
-      <div class="container header-inner">
-        <a class="logo" href="/" aria-label="Top Tier Electrical home">
-          <img
-            src="assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png"
-            alt="Top Tier Electrical logo"
-            width="200"
-            height="64"
-          />
-        </a>
-        <button
-          type="button"
-          class="menu-toggle"
-          aria-label="Toggle navigation"
-          aria-controls="main-nav"
-          aria-expanded="false"
-        >
-          <span></span><span></span><span></span>
-        </button>
-        <nav id="main-nav" aria-label="Main navigation">
-          <ul>
-            <li><a href="/">Home</a></li>
-            <li><a href="services">Services</a></li>
-            <li><a href="residential">Residential</a></li>
-            <li><a href="commercial">Commercial</a></li>
-            <li><a href="service-areas">Service&nbsp;Areas</a></li>
-            <li><a href="gallery">Our&nbsp;Work</a></li>
-            <li><a href="about">About</a></li>
-            <li><a href="contact">Contact</a></li>
-          </ul>
-          <div class="nav-cta">
-            <a href="tel:+16163347159" class="btn btn-ghost"
-              >Call / Text (616)&nbsp;334&#8209;7159</a
-            >
-            <a href="booking" class="btn btn-primary">Request Scheduling</a>
-          </div>
-        </nav>
-      </div>
-    </header>
+<!--@meta
+{
+  "title": "Professional Standards | Top Tier Electrical",
+  "description": "Professional standards and verified customer reviews for Top Tier Electrical across West Michigan.",
+  "pageType": "testimonials",
+  "service": "none",
+  "city": "none",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.6,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    {
+      "name": "Home",
+      "url": "/"
+    },
+    {
+      "name": "Professional Standards",
+      "url": "/testimonials"
+    }
+  ]
+}
+-->
+<section class="container" style="padding-top: 2rem; padding-bottom: 1rem">
+  <h1>Professional Standards</h1>
+  <p>
+    We focus on clear scope, clean workmanship, and dependable communication.
+    Below are verified Google Business reviews from recent clients.
+  </p>
+</section>
 
-    <main>
-      <section class="container" style="padding: 3rem 1rem 1rem">
-        <h1>Professional Standards</h1>
-        <p>
-          We focus on clear scope, clean workmanship, and dependable
-          communication. Below are verified Google Business reviews from recent
-          clients.
-        </p>
-      </section>
+<!-- =======================
+  TESTIMONIALS (DROP-IN)
+======================= -->
 
-      <!-- =======================
-        TESTIMONIALS (DROP-IN)
-      ======================= -->
-      <section class="ct-testimonials" aria-label="Customer reviews">
-        <div class="ct-testimonials__inner">
-          <header class="ct-testimonials__header">
-            <h2 class="ct-testimonials__title">Customer Reviews</h2>
-            <p class="ct-testimonials__subtitle">
-              Real feedback from recent clients.
-            </p>
-          </header>
+<section class="ct-testimonials" aria-label="Customer reviews">
+  <div class="ct-testimonials__inner">
+    <header class="ct-testimonials__header">
+      <h2 class="ct-testimonials__title">Customer Reviews</h2>
+      <p class="ct-testimonials__subtitle">

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 120
  26 147 162
  27  75 157
  28  42 146
  30 156 163
  31  42 163
  32  76 151
  33  12 157
  34  40 156
  35  40 141
  36  74 154
  37 150  40
  38 145 123
  39 141 164
  40 144 141
  41  76 156
  42  12 144
  43  40 141
  44  40 162
  45  40 144
  46  40 163
  47  74  40
  48 155 174
  49 145  40
  50 164 124
  51 141 157
  52  40 160
  53 143  40

```

</details>


## 2. `residential.html` → `pages/residential.html`

- Score: **0.6272**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/residential.html__TO__pages_residential.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/residential.html__TO__pages_residential.html.cmp.txt`

- Unified diff line delta: **+33 / -95**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/residential.html b/tmp/tmp.cS0l193Uwl/src_version/pages/residential.html
index bcaaeb5..bd8da7b 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/residential.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/residential.html
@@ -1,95 +1,33 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta name="robots" content="index, follow" />
-    <title>Residential Electrician Services | Top Tier Electrical</title>
-    <meta
-      name="description"
-      content="Residential electrical services across West Michigan."
-    />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-  </head>
-  <body>
-    <header class="site-header">
-      <div class="container header-inner">
-        <a class="logo" href="/" aria-label="Top Tier Electrical home"
-          ><img
-            src="assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png"
-            alt="Top Tier Electrical logo"
-            width="200"
-            height="64"
-        /></a>
-        <nav id="main-nav">
-          <ul>
-            <li><a href="/">Home</a></li>
-            <li><a href="services">Services</a></li>
-            <li><a href="residential">Residential</a></li>
-            <li><a href="commercial">Commercial</a></li>
-            <li><a href="service-areas">Service&nbsp;Areas</a></li>
-            <li><a href="gallery">Our&nbsp;Work</a></li>
-            <li><a href="about">About</a></li>
-            <li><a href="contact">Contact</a></li>
-          </ul>
-        </nav>
-      </div>
-    </header>
-    <main id="main-content">
-      <section class="hero">
-        <div class="hero-content">
-          <h1>Residential Electrical Services</h1>
-          <p>Electrical service work for homes across West Michigan.</p>
-          <a href="booking" class="btn-primary">Request Scheduling</a>
-        </div>
-      </section>
-      <section class="services">
-        <div class="container">
-          <h2>Services for Homeowners</h2>
-          <ul>
-            <li><a href="panel-upgrades">Panel upgrades</a></li>
-            <li><a href="ev-chargers">EV charger installation</a></li>
-            <li><a href="lighting">Kitchen and whole-home lighting</a></li>
-            <li>
-              <a href="electrical-repairs">Repairs and troubleshooting</a>
-            </li>
-            <li><a href="generators">Backup generator planning</a></li>
-            <li><a href="energy-solutions">Energy and load planning</a></li>
-          </ul>
-          <h3>What to Expect</h3>
-          <p>
-            Submit a request, receive a clear scope, and choose a confirmed
-            scheduling window.
-          </p>
-          <div class="proof-grid">
-            <figure class="proof-card">
-              <img
-                src="assets/images/projects/service-after.jpg"
-                alt="Residential panel upgrade"
-              />
-              <figcaption>
-                Outdated service gear → upgraded panel → safer daily power.
-              </figcaption>
-            </figure>
-            <figure class="proof-card">
-              <img
-                src="assets/images/projects/myenergi-4SyUf9MvWjU-unsplash.jpg"
-                alt="Residential EV charging"
-              />
-              <figcaption>
-                No Level 2 charging at home → dedicated circuit install →
-                reliable overnight charging.
-              </figcaption>
-            </figure>
-          </div>
-        </div>
-      </section>
-    </main>
-    <footer class="site-footer">
-      <p>MI License #6220430</p>
-      <p>&copy; 2025 Top Tier Electrical. All rights reserved.</p>
-    </footer>
-  </body>
-</html>
+<!--@meta
+{
+  "title": "Residential Electrician | West Michigan | Top Tier Electrical",
+  "description": "Residential electrical services across West Michigan: panel upgrades, EV charging, lighting, dedicated circuits, troubleshooting, and safety improvements.",
+  "pageType": "residential",
+  "service": "none",
+  "city": "none",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.6,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    {
+      "name": "Home",
+      "url": "/"
+    },
+    {
+      "name": "Residential",
+      "url": "/residential"

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

  3 144  55
  4 157  55
  5 143 100
  6 164 155
  7 171 145
  8 160 164
  9 145 141
 10  40  12
 11 150 173
 12 164  12
 13 155  40
 14 154  40
 15  76  42
 16  12 164
 17  74 151
 18 150 164
 19 164 154
 20 155 145
 21 154  42
 22  40  72
 23 154  40
 24 141  42
 25 156 122
 26 147 145
 27  75 163
 28  42 151
 29 145 144
 30 156 145
 31  42 156
 32  76 164
 33  12 151
 34  40 141
 35  40 154
 36  74  40
 37 150 105
 38 145 154
 39 141 145
 40 144 143
 41  76 164
 42  12 162
 43  40 151
 44  40 143
 45  40 151
 46  40 141
 47  74 156
 48 155  40
 49 145 174
 50 164  40
 51 141 127
 52  40 145

```

</details>


## 3. `commercial.html` → `pages/commercial.html`

- Score: **0.5799**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/commercial.html__TO__pages_commercial.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/commercial.html__TO__pages_commercial.html.cmp.txt`

- Unified diff line delta: **+32 / -109**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/commercial.html b/tmp/tmp.cS0l193Uwl/src_version/pages/commercial.html
index 53bb3e7..27b5f1f 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/commercial.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/commercial.html
@@ -1,109 +1,32 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta name="robots" content="index, follow" />
-    <title>Commercial Electrician Services | Top Tier Electrical</title>
-    <meta
-      name="description"
-      content="Commercial electrical services for light industrial and business spaces."
-    />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-  </head>
-  <body>
-    <header class="site-header">
-      <div class="container header-inner">
-        <a class="logo" href="/" aria-label="Top Tier Electrical home"
-          ><img
-            src="assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png"
-            alt="Top Tier Electrical logo"
-            width="200"
-            height="64"
-        /></a>
-        <nav id="main-nav">
-          <ul>
-            <li><a href="/">Home</a></li>
-            <li><a href="services">Services</a></li>
-            <li><a href="residential">Residential</a></li>
-            <li><a href="commercial">Commercial</a></li>
-            <li><a href="service-areas">Service&nbsp;Areas</a></li>
-            <li><a href="gallery">Our&nbsp;Work</a></li>
-            <li><a href="about">About</a></li>
-            <li><a href="contact">Contact</a></li>
-          </ul>
-        </nav>
-      </div>
-    </header>
-    <main id="main-content">
-      <section class="hero">
-        <div class="hero-content">
-          <h1>Commercial Electrical Services</h1>
-          <p>
-            Service, upgrades, and maintenance for commercial spaces in West
-            Michigan.
-          </p>
-          <a href="booking" class="btn-primary">Request Scheduling</a>
-        </div>
-      </section>
-      <section class="services">
-        <div class="container">
-          <h2>Services for Commercial Sites</h2>
-          <ul>
-            <li>
-              <a href="commercial-electrical-maintenance"
-                >Commercial maintenance</a
-              >
-            </li>
-            <li>
-              <a href="commercial-led-lighting-retrofit"
-                >Warehouse and facility lighting</a
-              >
-            </li>
-            <li>
-              <a href="electrical-design-consultation"
-                >Controls and distribution planning</a
-              >
-            </li>
-            <li><a href="services">3-phase distribution upgrades</a></li>
-            <li><a href="services">Troubleshooting and urgent repair</a></li>
-            <li><a href="services">Tenant improvement electrical work</a></li>
-          </ul>
-          <h3>What to Expect</h3>
-          <p>
-            We review scope, align around schedule constraints, and complete
-            code-aware installations with documented handoff.
-          </p>
-          <div class="proof-grid">
-            <figure class="proof-card">
-              <img
-                src="assets/images/projects/commercial-control-panel-wiring.jpg"
-                alt="Commercial control panel wiring completed for reliable operations"
-              />
-              <figcaption>
-                Inconsistent field wiring → organized control panel rebuild →
-                safer maintenance and more reliable equipment uptime.
-              </figcaption>
-            </figure>
-            <figure class="proof-card">
-              <img
-                src="assets/images/projects/480v-3-phase.jpg"
-                alt="Three-phase distribution work"
-              />
-              <figcaption>
-                Equipment load mismatch → 3-phase distribution updates →
-                dependable uptime.
-              </figcaption>
-            </figure>
-          </div>
-        </div>
-      </section>
-    </main>
-    <footer class="site-footer">
-      <p>MI License #6220430</p>
-      <p>&copy; 2025 Top Tier Electrical. All rights reserved.</p>
-    </footer>
-  </body>
-</html>
+<!--@meta
+{
+  "title": "Commercial Electrician | West Michigan | Top Tier Electrical",
+  "description": "Light commercial electrical services across West Michigan: troubleshooting, lighting, tenant improvements, dedicated circuits, and code corrections.",
+  "pageType": "commercial",
+  "service": "none",

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

  3 144  55
  4 157  55
  5 143 100
  6 164 155
  7 171 145
  8 160 164
  9 145 141
 10  40  12
 11 150 173
 12 164  12
 13 155  40
 14 154  40
 15  76  42
 16  12 164
 17  74 151
 18 150 164
 19 164 154
 20 155 145
 21 154  42
 22  40  72
 23 154  40
 24 141  42
 25 156 103
 26 147 157
 27  75 155
 28  42 155
 30 156 162
 31  42 143
 32  76 151
 33  12 141
 34  40 154
 36  74 105
 37 150 154
 39 141 143
 40 144 164
 41  76 162
 42  12 151
 43  40 143
 44  40 151
 45  40 141
 46  40 156
 47  74  40
 48 155 174
 49 145  40
 50 164 127
 51 141 145
 52  40 163
 53 143 164
 54 150  40
 55 141 115

```

</details>


## 4. `thank-you.html` → `pages/thank-you.html`

- Score: **0.5343**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/thank-you.html__TO__pages_thank-you.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/thank-you.html__TO__pages_thank-you.html.cmp.txt`

- Unified diff line delta: **+32 / -241**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/thank-you.html b/tmp/tmp.cS0l193Uwl/src_version/pages/thank-you.html
index dcec935..67a47e8 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/thank-you.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/thank-you.html
@@ -1,241 +1,32 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
-
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="noindex, nofollow" />
-    <title>Thank You | Top Tier Electrical</title>
-    <meta
-      name="description"
-      content="Thank you for contacting Top Tier Electrical. We’ll confirm next steps within one business day."
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <meta property="og:title" content="Thank You | Top Tier Electrical" />
-    <meta
-      property="og:description"
-      content="Thanks for reaching out to Top Tier Electrical. We’ll be in touch soon."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/hero.jpg"
-    />
-    <meta
-      property="og:url"
-      content="https://toptier-electrical.com/thank-you"
-    />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/thank-you" />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-    <script
-      defer
-      src="https://static.cloudflareinsights.com/beacon.min.js"
-      data-cf-beacon='{"token":"f3a4c2b1d9e54a6b8c1f7e2d3a4b5c6d"}'
-    ></script>
-  </head>
-  <body>
-    <a href="#main-content" class="skip-link">Skip to main content</a>
-    <header class="site-header">
-      <div class="container header-inner">
-        <a class="logo" href="/" aria-label="Top Tier Electrical home">
-          <picture>
-            <source
-              srcset="
-                assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png
-              "
-              type="image/png"
-            />
-            <img
-              src="assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png"
-              alt="Top Tier Electrical logo"
-              width="200"
-              height="64"
-              decoding="async"
-            />
-          </picture>
-        </a>
-        <button
-          type="button"
-          class="menu-toggle"
-          aria-label="Toggle navigation"
-          aria-controls="main-nav"
-          aria-expanded="false"
-        >
-          <span class="menu-bar"></span>
-          <span class="menu-bar"></span>
-          <span class="menu-bar"></span>
-        </button>
-        <nav id="main-nav" class="main-nav">
-          <ul>
-            <li><a href="/">Home</a></li>
-            <li><a href="services">Services</a></li>
-            <li><a href="residential">Residential</a></li>
-            <li><a href="commercial">Commercial</a></li>
-            <li><a href="service-areas">Service&nbsp;Areas</a></li>
-            <li><a href="gallery">Our&nbsp;Work</a></li>
-            <li><a href="about">About</a></li>

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

  3 144  55
  4 157  55
  5 143 100
  6 164 155
  7 171 145
  8 160 164
  9 145 141
 10  40  12
 11 150 173
 12 164  12
 13 155  40
 14 154  40
 15  76  42
 16  12 164
 17  74 151
 18 150 164
 19 164 154
 20 155 145
 21 154  42
 22  40  72
 23 154  40
 24 141  42
 25 156 122
 26 147 145
 27  75 161
 28  42 165
 30 156 163
 31  42 164
 32  76  40
 33  12 122
 34  40 145
 35  40 143
 36  74 145
 37 150 151
 38 145 166
 39 141 145
 41  76  40
 42  12 174
 44  40 124
 45  40 157
 46  40 160
 47  74  40
 48  41 124
 49  55 151
 50  55 145
 51  40 162
 52 107  40
 53 157 105
 54 157 154
 55 147 145

```

</details>


## 5. `about.html` → `pages/about.html`

- Score: **0.5122**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/about.html__TO__pages_about.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/about.html__TO__pages_about.html.cmp.txt`

- Unified diff line delta: **+33 / -139**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/about.html b/tmp/tmp.cS0l193Uwl/src_version/pages/about.html
index 3aed965..26170b6 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/about.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/about.html
@@ -1,139 +1,33 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <title>About Top Tier Electrical | West Michigan</title>
-    <meta
-      name="description"
-      content="Meet Top Tier Electrical: owner-operated, licensed and insured electrical contracting in West Michigan with clear scope, clean execution, and future-proof planning."
-    />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-  </head>
-  <body>
-    <a href="#main-content" class="skip-link">Skip to main content</a>
-    <header class="site-header">
-      <div class="container header-inner">
-        <a class="logo" href="/" aria-label="Top Tier Electrical home">
-          <img
-            src="assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png"
-            alt="Top Tier Electrical logo"
-            width="200"
-            height="64"
-          />
-        </a>
-        <button
-          type="button"
-          class="menu-toggle"
-          aria-label="Toggle navigation"
-          aria-controls="main-nav"
-          aria-expanded="false"
-        >
-          <span></span>
-          <span></span>
-          <span></span>
-        </button>
-        <nav id="main-nav" aria-label="Main navigation">
-          <ul>
-            <li><a href="/">Home</a></li>
-            <li><a href="services">Services</a></li>
-            <li><a href="residential">Residential</a></li>
-            <li><a href="commercial">Commercial</a></li>
-            <li><a href="service-areas">Service&nbsp;Areas</a></li>
-            <li><a href="gallery">Our&nbsp;Work</a></li>
-            <li><a href="about">About</a></li>
-            <li><a href="contact">Contact</a></li>
-          </ul>
-          <div class="nav-cta">
-            <a href="tel:+16163347159" class="btn btn-ghost"
-              >Call / Text (616)&nbsp;334&#8209;7159</a
-            >
-            <a href="booking" class="btn btn-primary">Request Scheduling</a>
-          </div>
-        </nav>
-      </div>
-    </header>
-
-    <main id="main-content">
-      <section class="hero">
-        <div class="hero-content">
-          <h1>
-            Owner-Operated Electrical Contracting Built for Long-Term
-            Reliability
-          </h1>
-          <p>
-            I started Top Tier Electrical to deliver clear communication, clean
-            code-correct work, and planning that helps clients avoid expensive
-            rework later.
-          </p>
-        </div>
-      </section>
-
-      <section class="container card">
-        <h2>My Story</h2>
-        <p>
-          I serve West Michigan homeowners and light commercial clients who want
-          the job done right the first time. I focus on scope clarity, realistic
-          timelines, and workmanship that respects your home or business.
-        </p>
-        <p>
-          Every project is handled with the same standards: polite
-          communication, honest recommendations, and thorough explanations so
-          you can make confident decisions.
-        </p>
-      </section>
-
-      <section class="container trust-section">
-        <h2>What to Expect</h2>
-        <div class="trust-grid">
-          <article class="trust-item">
-            <h3>Diagnose</h3>
-            <p>
-              We identify the root issue and gather the details that affect
-              scope.
-            </p>
-          </article>
-          <article class="trust-item">
-            <h3>Explain</h3>
-            <p>
-              You get options explained clearly, including future-proof
-              recommendations.
-            </p>
-          </article>
-          <article class="trust-item">
-            <h3>Scope</h3>
-            <p>
-              Clear scope before work begins, with permits and inspections
-              discussed upfront.
-            </p>
-          </article>
-          <article class="trust-item">
-            <h3>Execute &amp; Verify</h3>
-            <p>
-              Clean, code-correct installation with walkthrough before closeout.

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

  3 144  55
  4 157  55
  5 143 100
  6 164 155
  7 171 145
  8 160 164
  9 145 141
 10  40  12
 11 150 173
 12 164  12
 13 155  40
 14 154  40
 15  76  42
 16  12 164
 17  74 151
 18 150 164
 19 164 154
 20 155 145
 21 154  42
 22  40  72
 23 154  40
 24 141  42
 25 156 101
 26 147 142
 27  75 157
 28  42 165
 29 145 164
 30 156  40
 31  42 174
 32  76  40
 33  12 124
 34  40 157
 35  40 160
 36  74  40
 37 150 124
 38 145 151
 39 141 145
 40 144 162
 41  76  40
 42  12 105
 43  40 154
 44  40 145
 45  40 143
 46  40 164
 47  74 162
 48 155 151
 49 145 143
 50 164 141
 51 141 154
 52  40  42

```

</details>


## 6. `financing.html` → `pages/financing.html`

- Score: **0.5057**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/financing.html__TO__pages_financing.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/financing.html__TO__pages_financing.html.cmp.txt`

- Unified diff line delta: **+32 / -109**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/financing.html b/tmp/tmp.cS0l193Uwl/src_version/pages/financing.html
index d73861d..0314cf9 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/financing.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/financing.html
@@ -1,109 +1,32 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>Financing Options | Top Tier Electrical</title>
-    <meta
-      name="description"
-      content="Financing guidance for qualifying electrical projects in West Michigan. Get a clear project scope first, then review available payment options."
-    />
-    <link rel="canonical" href="https://toptier-electrical.com/financing" />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "LocalBusiness",
-        "name": "Top Tier Electrical",
-        "telephone": "+16163347159",
-        "email": "info@toptier-electrical.com",
-        "url": "https://toptier-electrical.com/",
-        "address": {
-          "@type": "PostalAddress",
-          "addressLocality": "Allegan",
-          "addressRegion": "MI",
-          "postalCode": "49010",
-          "addressCountry": "US"
-        },
-        "areaServed": "West Michigan"
-      }
-    </script>
-  </head>
-  <body>
-    <header class="site-header">
-      <div class="container header-inner">
-        <a class="logo" href="/" aria-label="Top Tier Electrical home">
-          <img
-            src="assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png"
-            alt="Top Tier Electrical logo"
-            width="200"
-            height="64"
-          />
-        </a>
-        <button
-          type="button"
-          class="menu-toggle"
-          aria-label="Toggle navigation"
-          aria-controls="main-nav"
-          aria-expanded="false"
-        >
-          <span></span><span></span><span></span>
-        </button>
-        <nav id="main-nav" aria-label="Main navigation">
-          <ul>
-            <li><a href="/">Home</a></li>
-            <li><a href="services">Services</a></li>
-            <li><a href="residential">Residential</a></li>
-            <li><a href="commercial">Commercial</a></li>
-            <li><a href="service-areas">Service&nbsp;Areas</a></li>
-            <li><a href="gallery">Our&nbsp;Work</a></li>
-            <li><a href="about">About</a></li>
-            <li><a href="contact">Contact</a></li>
-          </ul>
-        </nav>
-      </div>
-    </header>
-
-    <main id="main-content" class="container" style="padding: 3rem 1rem">
-      <h1>Financing Options</h1>
-      <p>
-        For qualifying projects, we can walk you through available financing
-        pathways after your scope is defined. We keep recommendations practical
-        so you can compare options confidently.
-      </p>
-
-      <h2>How Financing Discussions Work</h2>
-      <ol>
-        <li>Schedule a walkthrough and define project priorities.</li>
-        <li>Receive a clear scope and quote for the electrical work.</li>
-        <li>Review financing options that may apply to your project.</li>
-        <li>Choose a timeline that matches your budget and goals.</li>
-      </ol>
-
-      <h2>Projects Commonly Considered</h2>
-      <ul>
-        <li>Panel upgrades and service modernization</li>
-        <li>EV charger infrastructure</li>
-        <li>Generator and backup power readiness</li>
-        <li>Lighting and efficiency-focused upgrades</li>
-      </ul>
-
-      <p>
-        <a class="btn btn-primary" href="booking">Request Scheduling</a>
-        <a class="btn btn-ghost" href="tel:+16163347159"
-          >Call / Text (616)&nbsp;334&#8209;7159</a
-        >
-      </p>
-    </main>
-
-    <div class="sticky-bar">
-      <a href="tel:+16163347159">Call / Text</a>
-      <a href="booking" class="btn">Request Scheduling</a>
-    </div>
-    <script src="script.js" defer></script>
-  </body>
-</html>
+<!--@meta
+{
+  "title": "Financing | Top Tier Electrical",
+  "description": "Financing options for larger electrical projects (if available). Contact Top Tier Electrical to confirm eligibility and next steps.",
+  "pageType": "financing",
+  "service": "none",

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

  3 144  55
  4 157  55
  5 143 100
  6 164 155
  7 171 145
  8 160 164
  9 145 141
 10  40  12
 11 150 173
 12 164  12
 13 155  40
 14 154  40
 15  76  42
 16  12 164
 17  74 151
 18 150 164
 19 164 154
 20 155 145
 21 154  42
 22  40  72
 23 154  40
 24 141  42
 25 156 106
 26 147 151
 27  75 156
 28  42 141
 29 145 156
 30 156 143
 31  42 151
 32  76 156
 33  12 147
 35  40 174
 36  74  40
 37 150 124
 38 145 157
 39 141 160
 40 144  40
 41  76 124
 42  12 151
 43  40 145
 44  40 162
 46  40 105
 47  74 154
 48 155 145
 49 145 143
 51 141 162
 52  40 151
 54 150 141
 55 141 154
 56 162  42

```

</details>


## 7. `faq.html` → `pages/faq.html`

- Score: **0.4456**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/faq.html__TO__pages_faq.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/faq.html__TO__pages_faq.html.cmp.txt`

- Unified diff line delta: **+32 / -448**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/faq.html b/tmp/tmp.cS0l193Uwl/src_version/pages/faq.html
index 3502f1a..3e76189 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/faq.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/faq.html
@@ -1,448 +1,32 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
-
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>FAQ | Top Tier Electrical</title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="Frequently asked questions about electrical services, panel upgrades, EV chargers and more."
-    />
-    <meta
-      name="keywords"
-      content="electrician FAQ, electrical questions, panel upgrade FAQ, EV charger FAQ"
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="Frequently Asked Questions | Top Tier Electrical"
-    />
-    <meta
-      property="og:description"
-      content="Find answers to common questions about our electrical services in West Michigan."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/hero.jpg"
-    />
-    <meta property="og:url" content="https://toptier-electrical.com/faq" />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/faq" />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link rel="preload" as="image" href="/assets/images/hero.jpg" />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-    <!-- Structured data -->
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "Electrician",
-        "name": "Top Tier Electrical",
-        "url": "https://toptier-electrical.com/",
-        "telephone": "+1-616-334-7159",
-        "email": "info@toptier-electrical.com",
-        "areaServed": [
-          "West Michigan",
-          "Holland, MI",
-          "Grand Rapids, MI",
-          "Byron Center, MI",
-          "Zeeland, MI",
-          "Saugatuck, MI",
-          "Hudsonville, MI",
-          "Allegan, MI"
-        ],
-        "sameAs": ["https://www.facebook.com/profile.php?id=61573826170938"],
-        "openingHoursSpecification": [
-          {
-            "@type": "OpeningHoursSpecification",
-            "dayOfWeek": [
-              "Monday",
-              "Tuesday",
-              "Wednesday",
-              "Thursday",
-              "Friday"
-            ],
-            "opens": "08:00",
-            "closes": "18:00"
-          },
-          {
-            "@type": "OpeningHoursSpecification",
-            "dayOfWeek": ["Saturday"],
-            "opens": "09:00",
-            "closes": "13:00"
-          }
-        ]

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

  3 144  55
  4 157  55
  5 143 100
  6 164 155
  7 171 145
  8 160 164
  9 145 141
 10  40  12
 11 150 173
 12 164  12
 13 155  40
 14 154  40
 15  76  42
 16  12 164
 17  74 151
 18 150 164
 19 164 154
 20 155 145
 21 154  42
 22  40  72
 23 154  40
 24 141  42
 25 156 106
 26 147 101
 27  75 121
 28  42  40
 29 145 174
 30 156  40
 31  42 124
 32  76 157
 33  12 160
 35  40 124
 36  74 151
 37 150 145
 38 145 162
 39 141  40
 40 144 105
 41  76 154
 42  12 145
 43  40 143
 44  40 164
 45  40 162
 46  40 151
 47  74 143
 48  41 141
 49  55 154
 50  55  42
 51  40  54
 52 107  12
 53 157  40

```

</details>


## 8. `contact.html` → `pages/contact.html`

- Score: **0.4394**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/contact.html__TO__pages_contact.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/contact.html__TO__pages_contact.html.cmp.txt`

- Unified diff line delta: **+61 / -397**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/contact.html b/tmp/tmp.cS0l193Uwl/src_version/pages/contact.html
index da06bcd..b5af90d 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/contact.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/contact.html
@@ -1,400 +1,64 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
-
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>Contact Top Tier Electrical | West Michigan Electrician</title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="Call or email Top Tier Electrical for service in West Michigan. Share project details or request scheduling to confirm next steps."
+<!--@meta
+{
+  "title": "Contact | Top Tier Electrical",
+  "description": "Contact Top Tier Electrical for West Michigan electrical service. Call/text or send a message to confirm scope and next steps.",
+  "pageType": "contact",
+  "service": "none",
+  "city": "none",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.6,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    {
+      "name": "Home",
+      "url": "/"
+    },
+    {
+      "name": "Contact",
+      "url": "/contact"
+    }
+  ]
+}
+-->
+<section class="container">
+  <h1>Contact</h1>
+  <p>Call/text for fast response, or send a message.</p>
+  <!--@include cta-call-inline -->
+  <form
+    class="form"
+    data-form="contact"
+    action="https://formspree.io/f/mkovbvgj"
+    method="POST"
+  >
+    <input
+      type="hidden"
+      name="_subject"
+      value="New contact request from Top Tier Electrical"
     />
-    <meta
-      name="keywords"
-      content="contact electrician, West Michigan electrical services, electrician phone number, email"
+    <input
+      type="hidden"
+      name="_next"
+      value="https://toptier-electrical.com/thank-you"
     />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="Contact Top Tier Electrical | West Michigan Electrician"
+    <input type="hidden" name="form_name" value="Contact form" />
+    <input
+      class="form-honeypot"
+      type="text"
+      name="_gotcha"
+      aria-label="Leave this field blank"
+      tabindex="-1"
+      autocomplete="off"
+      aria-hidden="true"
     />
-    <meta
-      property="og:description"
-      content="Contact Top Tier Electrical by phone, email, or booking form for service in West Michigan."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/hero.jpg"
-    />
-    <meta property="og:url" content="https://toptier-electrical.com/contact" />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/contact" />
-    <!-- Google Inter font -->
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link rel="preconnect" href="https://www.google.com" />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 103
  26 147 157
  27  75 156
  28  42 164
  29 145 141
  30 156 143
  31  42 164
  32  76  40
  33  12 174
  35  40 124
  36  74 157
  37 150 160
  38 145  40
  39 141 124
  40 144 151
  41  76 145
  42  12 162
  44  40 105
  45  40 154
  46  40 145
  47  74 143
  48  41 164
  49  55 162
  50  55 151
  51  40 143
  52 107 141
  53 157 154
  54 157  42

```

</details>


## 9. `generators.html` → `pages/generators.html`

- Score: **0.4379**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/generators.html__TO__pages_generators.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/generators.html__TO__pages_generators.html.cmp.txt`

- Unified diff line delta: **+76 / -542**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/generators.html b/tmp/tmp.cS0l193Uwl/src_version/pages/generators.html
index 60592e9..affc64a 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/generators.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/generators.html
@@ -1,546 +1,80 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
+<!--@meta
+{
+  "title": "Generator Installation | West Michigan Electrician",
+  "description": "Generator readiness and installation across West Michigan. Transfer switches, interlocks, and clean, code-aware planning.",
+  "pageType": "service",
+  "service": "generators",
+  "city": "none",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.8,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    { "name": "Home", "url": "/" },
+    { "name": "Services", "url": "/services" },
+    { "name": "Generators", "url": "/generators" }
+  ]
+}
+-->
+<section class="container">
+  <h1>Generator Installation</h1>
+  <p>
+    We help West Michigan property owners plan backup power systems with safe
+    transfer methods, realistic load planning, and clean installation standards.
+    The goal is dependable outage readiness without risky shortcuts.
+  </p>
 
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>Generator Installation | West Michigan Electrician</title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="Backup power systems sized and installed safely with clear scope, clean workmanship, and verified operation."
-    />
-    <meta
-      name="keywords"
-      content="generator installation, backup power, West Michigan electrician"
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="Generator Installation | Top Tier Electrical"
-    />
-    <meta
-      property="og:description"
-      content="Backup power systems sized and installed safely with clear scope and verified operation."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/projects/generator-transfer-switch-install.jpg"
-    />
-    <meta
-      property="og:url"
-      content="https://toptier-electrical.com/generators"
-    />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/generators" />
-    <link
-      rel="preload"
-      as="image"
-      href="/assets/images/projects/generator-transfer-switch-install.jpg"
-    />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-    <!-- Structured data -->
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "Electrician",
-        "name": "Top Tier Electrical",
-        "url": "https://toptier-electrical.com/",

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 107
  26 147 145
  27  75 156
  28  42 145
  29 145 162
  30 156 141
  31  42 164
  32  76 157
  33  12 162
  35  40 111
  36  74 156
  37 150 163
  38 145 164
  40 144 154
  41  76 154
  42  12 141
  43  40 164
  44  40 151
  45  40 157
  46  40 156
  47  74  40
  48  41 174
  49  55  40
  50  55 127
  51  40 145
  52 107 163
  53 157 164
  54 157  40

```

</details>


## 10. `electrician-holland.html` → `pages/electrician-holland.html`

- Score: **0.4373**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/electrician-holland.html__TO__pages_electrician-holland.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/electrician-holland.html__TO__pages_electrician-holland.html.cmp.txt`

- Unified diff line delta: **+81 / -65**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/electrician-holland.html b/tmp/tmp.cS0l193Uwl/src_version/pages/electrician-holland.html
index 80d8a91..306eceb 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/electrician-holland.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/electrician-holland.html
@@ -1,65 +1,81 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta name="robots" content="index, follow" />
-    <title>Electrician Holland MI | Top Tier Electrical</title>
-    <meta name="description" content="Licensed electrician in Holland, MI." />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-  </head>
-  <body>
-    <header class="site-header">
-      <div class="container header-inner">
-        <a class="logo" href="/" aria-label="Top Tier Electrical home"
-          ><img
-            src="assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png"
-            alt="Top Tier Electrical logo"
-            width="200"
-            height="64"
-        /></a>
-        <nav id="main-nav">
-          <ul>
-            <li><a href="/">Home</a></li>
-            <li><a href="services">Services</a></li>
-            <li><a href="residential">Residential</a></li>
-            <li><a href="commercial">Commercial</a></li>
-            <li><a href="service-areas">Service&nbsp;Areas</a></li>
-            <li><a href="gallery">Our&nbsp;Work</a></li>
-            <li><a href="about">About</a></li>
-            <li><a href="contact">Contact</a></li>
-          </ul>
-        </nav>
-      </div>
-    </header>
-    <main id="main-content">
-      <section class="hero">
-        <div class="hero-content">
-          <h1>Electrician in Holland, MI</h1>
-          <p>Electrical service for Holland homes and commercial spaces.</p>
-          <a href="booking" class="btn-primary">Request Scheduling</a>
-        </div>
-      </section>
-      <section class="services">
-        <div class="container">
-          <h2>Holland Service Coverage</h2>
-          <p>
-            Panel upgrades, EV charger installations, lighting projects, and
-            commercial maintenance support.
-          </p>
-          <p>
-            <a href="contact" class="btn-secondary"
-              >Confirm availability in Holland</a
-            >
-          </p>
-        </div>
-      </section>
-    </main>
-    <footer class="site-footer">
-      <p>MI License #6220430</p>
-      <p>&copy; 2025 Top Tier Electrical. All rights reserved.</p>
-    </footer>
-  </body>
-</html>
+<!--@meta
+{
+  "title": "Electrician in Holland, MI | Top Tier Electrical",
+  "description": "Owner-operated electrician serving Holland, MI. Panel upgrades, EV chargers, generators, lighting, and troubleshooting-clean work with clear scope.",
+  "pageType": "city",
+  "service": "none",
+  "city": "holland",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.7,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    { "name": "Home", "url": "/" },
+    { "name": "Service Areas", "url": "/service-areas" },
+    { "name": "Holland", "url": "/electrician-holland" }
+  ]
+}
+-->
+<section class="container">
+  <h1>Electrician in Holland, MI</h1>
+  <p>
+    Top Tier Electrical provides owner-operated electrical service in Holland
+    with an emphasis on clean workmanship, reliable scheduling, and clear
+    communication. We help property owners address active issues like breaker
+    trips and outage preparation while planning upgrades that improve safety and
+    long-term capacity. From residential updates to light commercial
+    improvements, our approach is to define scope early, execute neatly, and
+    leave each system more organized, more documented, and easier to maintain.
+    Clients also rely on us for permit-conscious planning, transparent pricing
+    ranges, and practical sequencing that minimizes disruption during active
+    occupancy.
+  </p>
+
+  <h2>Popular services in Holland</h2>
+  <ul>
+    <li><a href="/panel-upgrades">Electrical panel upgrades</a></li>
+    <li><a href="/ev-chargers">EV charger installation</a></li>
+    <li>
+      <a href="/generators">Generator readiness and transfer switching</a>
+    </li>
+    <li>
+      <a href="/dedicated-circuits">Dedicated circuits for new equipment</a>
+    </li>
+    <li><a href="/electrical-repairs">Troubleshooting and repairs</a></li>
+  </ul>
+
+  <h2>Local project focus</h2>
+  <p>
+    In Holland, we regularly support remodel-driven service upgrades, detached

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 105
  26 147 154
  27  75 145
  28  42 143
  29 145 164
  30 156 162
  31  42 151
  32  76 143
  33  12 151
  34  40 141
  35  40 156
  36  74  40
  37 150 151
  38 145 156
  39 141  40
  40 144 110
  41  76 157
  42  12 154
  43  40 154
  44  40 141
  45  40 156
  46  40 144
  47  74  54
  48 155  40
  49 145 115
  50 164 111
  51 141  40
  52  40 174

```

</details>


## 11. `ev-chargers.html` → `pages/ev-chargers.html`

- Score: **0.4350**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/ev-chargers.html__TO__pages_ev-chargers.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/ev-chargers.html__TO__pages_ev-chargers.html.cmp.txt`

- Unified diff line delta: **+72 / -533**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/ev-chargers.html b/tmp/tmp.cS0l193Uwl/src_version/pages/ev-chargers.html
index e17872e..a62e557 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/ev-chargers.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/ev-chargers.html
@@ -1,537 +1,76 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
+<!--@meta
+{
+  "title": "EV Charger Installation | West Michigan Electrician",
+  "description": "Level 2 EV charger installation across West Michigan. Dedicated circuits, safe routing, and clean workmanship for home charging.",
+  "pageType": "service",
+  "service": "ev_chargers",
+  "city": "none",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.8,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    { "name": "Home", "url": "/" },
+    { "name": "Services", "url": "/services" },
+    { "name": "EV Chargers", "url": "/ev-chargers" }
+  ]
+}
+-->
+<section class="container">
+  <h1>EV Charger Installation</h1>
+  <p>
+    We install Level 2 EV charging systems with dedicated circuits, properly
+    sized protection, and clean routing that supports safe daily use. Our
+    process is designed to match your vehicle, charging goals, and panel
+    capacity so the final install performs reliably.
+  </p>
 
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>EV Charger Installation | West Michigan Electrician</title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="Level 2 EV charger installs with capacity checks, clean wiring, and permit coordination. Safe, code-compliant charging for your home or business."
-    />
-    <meta
-      name="keywords"
-      content="EV charger installation, electric vehicle charger, home charging station, West Michigan electrician"
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="EV Charger Installation in West Michigan | Top Tier Electrical"
-    />
-    <meta
-      property="og:description"
-      content="Level 2 EV charger installation with safe routing, correct breakers, and capacity checks."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/projects/480v-3-phase.jpg"
-    />
-    <meta
-      property="og:url"
-      content="https://toptier-electrical.com/ev-chargers"
-    />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/ev-chargers" />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link
-      rel="preload"
-      as="image"
-      href="/assets/images/projects/480v-3-phase.jpg"
-    />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-    <!-- Structured data -->
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "Electrician",
-        "name": "Top Tier Electrical",

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 105
  26 147 126
  27  75  40
  28  42 103
  29 145 150
  30 156 141
  31  42 162
  32  76 147
  33  12 145
  34  40 162
  36  74 111
  37 150 156
  38 145 163
  39 141 164
  40 144 141
  41  76 154
  42  12 154
  43  40 141
  44  40 164
  45  40 151
  46  40 157
  47  74 156
  48  41  40
  49  55 174
  50  55  40
  51  40 127
  52 107 145
  53 157 163

```

</details>


## 12. `booking.html` → `pages/booking.html`

- Score: **0.4342**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/booking.html__TO__pages_booking.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/booking.html__TO__pages_booking.html.cmp.txt`

- Unified diff line delta: **+63 / -405**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/booking.html b/tmp/tmp.cS0l193Uwl/src_version/pages/booking.html
index c00f007..be4fb5a 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/booking.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/booking.html
@@ -1,408 +1,66 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
-
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>Book Electrical Service | Top Tier Electrical</title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="Schedule electrical service in West Michigan. Choose a service, preferred date, and time, and we’ll confirm the scope and next steps."
+<!--@meta
+{
+  "title": "Request Scheduling | Top Tier Electrical",
+  "description": "Request scheduling with Top Tier Electrical. Share your project details and we'll confirm scope and next steps within one business day.",
+  "pageType": "booking",
+  "service": "none",
+  "city": "none",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.6,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    {
+      "name": "Home",
+      "url": "/"
+    },
+    {
+      "name": "Booking",
+      "url": "/booking"
+    }
+  ]
+}
+-->
+<section class="container">
+  <h1>Request Scheduling</h1>
+  <p>
+    Send details and photos if available. We'll respond within one business day.
+  </p>
+  <form
+    class="form"
+    data-form="booking"
+    action="https://formspree.io/f/mkovbvgj"
+    method="POST"
+  >
+    <input
+      type="hidden"
+      name="_subject"
+      value="New booking request from Top Tier Electrical"
     />
-    <meta
-      name="keywords"
-      content="book electrician, schedule electrical service, West Michigan electrician booking"
+    <input
+      type="hidden"
+      name="_next"
+      value="https://toptier-electrical.com/thank-you"
     />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="Book Electrical Service | Top Tier Electrical"
+    <input type="hidden" name="form_name" value="Booking form" />
+    <input
+      class="form-honeypot"
+      type="text"
+      name="_gotcha"
+      aria-label="Leave this field blank"
+      tabindex="-1"
+      autocomplete="off"
+      aria-hidden="true"
     />
-    <meta
-      property="og:description"
-      content="Schedule service and confirm scope for electrical work in West Michigan."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/hero.jpg"
-    />
-    <meta property="og:url" content="https://toptier-electrical.com/booking" />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/booking" />
-    <link rel="preload" as="image" href="/assets/images/hero.jpg" />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 122
  26 147 145
  27  75 161
  28  42 165
  30 156 163
  31  42 164
  32  76  40
  33  12 123
  34  40 143
  35  40 150
  36  74 145
  37 150 144
  38 145 165
  39 141 154
  40 144 151
  41  76 156
  42  12 147
  44  40 174
  46  40 124
  47  74 157
  48  41 160
  49  55  40
  50  55 124
  51  40 151
  52 107 145
  53 157 162
  54 157  40
  55 147 105

```

</details>


## 13. `emergency.html` → `pages/emergency.html`

- Score: **0.4286**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/emergency.html__TO__pages_emergency.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/emergency.html__TO__pages_emergency.html.cmp.txt`

- Unified diff line delta: **+32 / -384**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/emergency.html b/tmp/tmp.cS0l193Uwl/src_version/pages/emergency.html
index cbe1635..1801aa8 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/emergency.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/emergency.html
@@ -1,384 +1,32 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
-
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>Emergency Electrical Services | Top Tier Electrical</title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="Urgent electrical service for Holland, Grand Rapids and West Michigan residents and businesses. Call to confirm next steps and safe shutdown guidance."
-    />
-    <meta
-      name="keywords"
-      content="electrical emergency, emergency electrician West Michigan, urgent electrical service"
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="Emergency Electrical Services | Top Tier Electrical"
-    />
-    <meta
-      property="og:description"
-      content="Learn what to do in an electrical emergency and call for urgent assistance."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/hero.jpg"
-    />
-    <meta
-      property="og:url"
-      content="https://toptier-electrical.com/emergency"
-    />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/emergency" />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link rel="preload" as="image" href="/assets/images/hero.jpg" />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-    <!-- Structured data -->
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "Electrician",
-        "name": "Top Tier Electrical",
-        "url": "https://toptier-electrical.com/",
-        "telephone": "+1-616-334-7159",
-        "email": "info@toptier-electrical.com",
-        "areaServed": [
-          "West Michigan",
-          "Holland, MI",
-          "Grand Rapids, MI",
-          "Byron Center, MI",
-          "Zeeland, MI",
-          "Saugatuck, MI",
-          "Hudsonville, MI",
-          "Allegan, MI"
-        ],
-        "sameAs": ["https://www.facebook.com/profile.php?id=61573826170938"],
-        "openingHoursSpecification": [
-          {
-            "@type": "OpeningHoursSpecification",
-            "dayOfWeek": [
-              "Monday",
-              "Tuesday",
-              "Wednesday",
-              "Thursday",
-              "Friday"
-            ],
-            "opens": "08:00",
-            "closes": "18:00"
-          },
-          {
-            "@type": "OpeningHoursSpecification",
-            "dayOfWeek": ["Saturday"],
-            "opens": "09:00",

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

  3 144  55
  4 157  55
  5 143 100
  6 164 155
  7 171 145
  8 160 164
  9 145 141
 10  40  12
 11 150 173
 12 164  12
 13 155  40
 14 154  40
 15  76  42
 16  12 164
 17  74 151
 18 150 164
 19 164 154
 20 155 145
 21 154  42
 22  40  72
 23 154  40
 24 141  42
 25 156 105
 26 147 155
 27  75 145
 28  42 162
 29 145 147
 30 156 145
 31  42 156
 32  76 143
 33  12 171
 35  40 105
 36  74 154
 37 150 145
 38 145 143
 39 141 164
 40 144 162
 41  76 151
 42  12 143
 43  40 151
 44  40 141
 45  40 156
 47  74 174
 48  41  40
 49  55 127
 50  55 145
 51  40 163
 52 107 164
 53 157  40
 54 157 115

```

</details>


## 14. `electrical-repairs.html` → `pages/electrical-repairs.html`

- Score: **0.4243**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/electrical-repairs.html__TO__pages_electrical-repairs.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/electrical-repairs.html__TO__pages_electrical-repairs.html.cmp.txt`

- Unified diff line delta: **+75 / -592**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/electrical-repairs.html b/tmp/tmp.cS0l193Uwl/src_version/pages/electrical-repairs.html
index ca1b476..0a1b455 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/electrical-repairs.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/electrical-repairs.html
@@ -1,595 +1,78 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
+<!--@meta
+{
+  "title": "Electrical Troubleshooting & Repairs | West Michigan Electrician",
+  "description": "Electrical troubleshooting and repairs across West Michigan. Breaker trips, flickering lights, outlet issues, and service calls handled with clarity and safety.",
+  "pageType": "service",
+  "service": "repairs",
+  "city": "none",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.8,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    { "name": "Home", "url": "/" },
+    { "name": "Services", "url": "/services" },
+    { "name": "Repairs", "url": "/electrical-repairs" }
+  ]
+}
+-->
+<section class="container">
+  <h1>Electrical Troubleshooting &amp; Repairs</h1>
+  <p>
+    We diagnose electrical issues methodically, identify root causes, and
+    complete corrective repairs that prioritize safety and long-term
+    reliability. You get straightforward findings and a clear scope before work
+    proceeds.
+  </p>
 
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>
-      Electrical Repairs &amp; Troubleshooting | West Michigan Electrician
-    </title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="Dead outlets, tripping breakers, partial power loss, or flickering lights? We troubleshoot and repair electrical issues safely in West Michigan. Request scheduling today."
-    />
-    <meta
-      name="keywords"
-      content="electrical repairs, troubleshooting, tripping breakers, flickering lights, West Michigan electrician"
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="Electrical Repairs &amp; Troubleshooting | West Michigan Electrician"
-    />
-    <meta
-      property="og:description"
-      content="Safe electrical troubleshooting for outlets, breakers, and power loss in West Michigan."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/hero.jpg"
-    />
-    <meta
-      property="og:url"
-      content="https://toptier-electrical.com/electrical-repairs"
-    />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link
-      rel="canonical"
-      href="https://toptier-electrical.com/electrical-repairs"
-    />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-    <!-- Structured data -->
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "Electrician",
-        "name": "Top Tier Electrical",

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 105
  26 147 154
  27  75 145
  28  42 143
  29 145 164
  30 156 162
  31  42 151
  32  76 143
  33  12 141
  34  40 154
  36  74 124
  37 150 162
  38 145 157
  39 141 165
  40 144 142
  41  76 154
  42  12 145
  43  40 163
  44  40 150
  45  40 157
  46  40 157
  47  74 164
  48  41 151
  49  55 156
  50  55 147
  52 107  46
  53 157  40
  54 157 122

```

</details>


## 15. `electrician-grand-rapids.html` → `pages/electrician-grand-rapids.html`

- Score: **0.4228**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/electrician-grand-rapids.html__TO__pages_electrician-grand-rapids.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/electrician-grand-rapids.html__TO__pages_electrician-grand-rapids.html.cmp.txt`

- Unified diff line delta: **+77 / -68**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/electrician-grand-rapids.html b/tmp/tmp.cS0l193Uwl/src_version/pages/electrician-grand-rapids.html
index 6ecd416..5123853 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/electrician-grand-rapids.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/electrician-grand-rapids.html
@@ -1,68 +1,77 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta name="robots" content="index, follow" />
-    <title>Electrician Grand Rapids MI | Top Tier Electrical</title>
-    <meta
-      name="description"
-      content="Licensed electrician in Grand Rapids, MI."
-    />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-  </head>
-  <body>
-    <header class="site-header">
-      <div class="container header-inner">
-        <a class="logo" href="/" aria-label="Top Tier Electrical home"
-          ><img
-            src="assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png"
-            alt="Top Tier Electrical logo"
-            width="200"
-            height="64"
-        /></a>
-        <nav id="main-nav">
-          <ul>
-            <li><a href="/">Home</a></li>
-            <li><a href="services">Services</a></li>
-            <li><a href="residential">Residential</a></li>
-            <li><a href="commercial">Commercial</a></li>
-            <li><a href="service-areas">Service&nbsp;Areas</a></li>
-            <li><a href="gallery">Our&nbsp;Work</a></li>
-            <li><a href="about">About</a></li>
-            <li><a href="contact">Contact</a></li>
-          </ul>
-        </nav>
-      </div>
-    </header>
-    <main id="main-content">
-      <section class="hero">
-        <div class="hero-content">
-          <h1>Electrician in Grand Rapids, MI</h1>
-          <p>Residential and commercial electrical service in Grand Rapids.</p>
-          <a href="booking" class="btn-primary">Request Scheduling</a>
-        </div>
-      </section>
-      <section class="services">
-        <div class="container">
-          <h2>Grand Rapids Service Coverage</h2>
-          <p>
-            Panel upgrades, EV chargers, lighting upgrades, troubleshooting, and
-            commercial electrical support.
-          </p>
-          <p>
-            <a href="contact" class="btn-secondary"
-              >Confirm availability in Grand Rapids</a
-            >
-          </p>
-        </div>
-      </section>
-    </main>
-    <footer class="site-footer">
-      <p>MI License #6220430</p>
-      <p>&copy; 2025 Top Tier Electrical. All rights reserved.</p>
-    </footer>
-  </body>
-</html>
+<!--@meta
+{
+  "title": "Electrician in Grand Rapids, MI | Top Tier Electrical",
+  "description": "Owner-operated electrician serving Grand Rapids, MI. Panel upgrades, EV chargers, generators, lighting, and troubleshooting-clean work with clear scope.",
+  "pageType": "city",
+  "service": "none",
+  "city": "grand_rapids",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.7,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    { "name": "Home", "url": "/" },
+    { "name": "Service Areas", "url": "/service-areas" },
+    { "name": "Grand Rapids", "url": "/electrician-grand-rapids" }
+  ]
+}
+-->
+<section class="container">
+  <h1>Electrician in Grand Rapids, MI</h1>
+  <p>
+    Top Tier Electrical supports Grand Rapids homeowners and light commercial
+    properties with clear project planning, code-aware execution, and clean
+    jobsite standards. We help clients solve immediate electrical issues while
+    planning upgrades that support long-term reliability, from service capacity
+    improvements to modern lighting and EV charging. Every project starts with
+    scope clarity and straightforward communication so you know what is being
+    done, why it matters for safety, and what the next step is. We also
+    coordinate permit expectations, inspection readiness, and phased scheduling
+    so larger projects stay predictable from start through final walkthrough.
+  </p>
+
+  <h2>Popular services in Grand Rapids</h2>
+  <ul>
+    <li><a href="/panel-upgrades">Electrical panel upgrades</a></li>
+    <li><a href="/ev-chargers">EV charger installation</a></li>
+    <li>
+      <a href="/generators">Generator readiness and transfer switching</a>
+    </li>
+    <li><a href="/lighting">Interior and exterior lighting upgrades</a></li>
+    <li><a href="/electrical-repairs">Troubleshooting and repairs</a></li>
+  </ul>
+
+  <h2>Local project focus</h2>
+  <p>
+    Grand Rapids projects commonly involve older panel equipment, circuit

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 105
  26 147 154
  27  75 145
  28  42 143
  29 145 164
  30 156 162
  31  42 151
  32  76 143
  33  12 151
  34  40 141
  35  40 156
  36  74  40
  37 150 151
  38 145 156
  39 141  40
  40 144 107
  41  76 162
  42  12 141
  43  40 156
  44  40 144
  46  40 122
  47  74 141
  48 155 160
  49 145 151
  50 164 144
  51 141 163
  52  40  54
  53 143  40

```

</details>


## 16. `electrician-allegan.html` → `pages/electrician-allegan.html`

- Score: **0.4214**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/electrician-allegan.html__TO__pages_electrician-allegan.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/electrician-allegan.html__TO__pages_electrician-allegan.html.cmp.txt`

- Unified diff line delta: **+81 / -65**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/electrician-allegan.html b/tmp/tmp.cS0l193Uwl/src_version/pages/electrician-allegan.html
index 9ea818e..f6f6c6d 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/electrician-allegan.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/electrician-allegan.html
@@ -1,65 +1,81 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta name="robots" content="index, follow" />
-    <title>Electrician Allegan MI | Top Tier Electrical</title>
-    <meta name="description" content="Licensed electrician in Allegan, MI." />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-  </head>
-  <body>
-    <header class="site-header">
-      <div class="container header-inner">
-        <a class="logo" href="/" aria-label="Top Tier Electrical home"
-          ><img
-            src="assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png"
-            alt="Top Tier Electrical logo"
-            width="200"
-            height="64"
-        /></a>
-        <nav id="main-nav">
-          <ul>
-            <li><a href="/">Home</a></li>
-            <li><a href="services">Services</a></li>
-            <li><a href="residential">Residential</a></li>
-            <li><a href="commercial">Commercial</a></li>
-            <li><a href="service-areas">Service&nbsp;Areas</a></li>
-            <li><a href="gallery">Our&nbsp;Work</a></li>
-            <li><a href="about">About</a></li>
-            <li><a href="contact">Contact</a></li>
-          </ul>
-        </nav>
-      </div>
-    </header>
-    <main id="main-content">
-      <section class="hero">
-        <div class="hero-content">
-          <h1>Electrician in Allegan, MI</h1>
-          <p>Local electrical service and upgrades in Allegan.</p>
-          <a href="booking" class="btn-primary">Request Scheduling</a>
-        </div>
-      </section>
-      <section class="services">
-        <div class="container">
-          <h2>Allegan Service Coverage</h2>
-          <p>
-            Residential troubleshooting, service upgrades, lighting
-            improvements, and generator-related work.
-          </p>
-          <p>
-            <a href="contact" class="btn-secondary"
-              >Confirm availability in Allegan</a
-            >
-          </p>
-        </div>
-      </section>
-    </main>
-    <footer class="site-footer">
-      <p>MI License #6220430</p>
-      <p>&copy; 2025 Top Tier Electrical. All rights reserved.</p>
-    </footer>
-  </body>
-</html>
+<!--@meta
+{
+  "title": "Electrician in Allegan, MI | Top Tier Electrical",
+  "description": "Owner-operated electrician serving Allegan, MI. Panel upgrades, EV chargers, generators, lighting, and troubleshooting-clean work with clear scope.",
+  "pageType": "city",
+  "service": "none",
+  "city": "allegan",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.7,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    { "name": "Home", "url": "/" },
+    { "name": "Service Areas", "url": "/service-areas" },
+    { "name": "Allegan", "url": "/electrician-allegan" }
+  ]
+}
+-->
+<section class="container">
+  <h1>Electrician in Allegan, MI</h1>
+  <p>
+    Top Tier Electrical is based in the Allegan area and provides owner-operated
+    electrical work with an emphasis on quality, consistency, and code-aware
+    planning. We help clients solve current issues while preparing systems for
+    future electrical needs, from panel upgrades and dedicated circuits to
+    backup power planning. Every project is scoped clearly before work begins,
+    completed with clean installation practices, and documented so you
+    understand what was changed and how your system is better protected. Because
+    we are local, clients get responsive follow-through, practical
+    recommendations, and installation decisions tailored to real property
+    conditions.
+  </p>
+
+  <h2>Popular services in Allegan</h2>
+  <ul>
+    <li><a href="/panel-upgrades">Electrical panel upgrades</a></li>
+    <li><a href="/ev-chargers">EV charger installation</a></li>
+    <li>
+      <a href="/generators">Generator readiness and transfer switching</a>
+    </li>
+    <li><a href="/dedicated-circuits">Dedicated circuits</a></li>
+    <li><a href="/electrical-repairs">Troubleshooting and repairs</a></li>
+  </ul>
+
+  <h2>Local project focus</h2>
+  <p>
+    In and around Allegan, we frequently support panel replacements, farm and
+    outbuilding power planning, and corrective upgrades for safety and
+    reliability.

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 105
  26 147 154
  27  75 145
  28  42 143
  29 145 164
  30 156 162
  31  42 151
  32  76 143
  33  12 151
  34  40 141
  35  40 156
  36  74  40
  37 150 151
  38 145 156
  39 141  40
  40 144 101
  41  76 154
  42  12 154
  43  40 145
  44  40 147
  45  40 141
  46  40 156
  47  74  54
  48 155  40
  49 145 115
  50 164 111
  51 141  40
  52  40 174

```

</details>


## 17. `gallery.html` → `pages/gallery.html`

- Score: **0.4209**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/gallery.html__TO__pages_gallery.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/gallery.html__TO__pages_gallery.html.cmp.txt`

- Unified diff line delta: **+167 / -604**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/gallery.html b/tmp/tmp.cS0l193Uwl/src_version/pages/gallery.html
index 2694086..f3651f4 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/gallery.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/gallery.html
@@ -1,615 +1,178 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
+<!--@meta
+{
+  "title": "Gallery | Top Tier Electrical",
+  "description": "Project gallery for Top Tier Electrical. Real work across West Michigan: panel upgrades, EV chargers, lighting, and troubleshooting.",
+  "pageType": "gallery",
+  "service": "none",
+  "city": "none",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.6,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    {
+      "name": "Home",
+      "url": "/"
+    },
+    {
+      "name": "Gallery",
+      "url": "/gallery"
+    }
+  ]
+}
+-->
+<section class="container">
+  <h1>Gallery</h1>
+  <p>
+    Project gallery for Top Tier Electrical. Real work across West Michigan:
+    panel upgrades, EV chargers, lighting, and troubleshooting.
+  </p>
 
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>Gallery | Top Tier Electrical</title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="Browse our photo gallery of recent electrical projects including panel upgrades, conduit piping and LED installations across West Michigan."
-    />
-    <meta
-      name="keywords"
-      content="electrical project gallery, panel upgrade photos, conduit piping, LED lighting, West Michigan electrician"
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta property="og:title" content="Gallery | Top Tier Electrical" />
-    <meta
-      property="og:description"
-      content="Explore photos of our electrical projects—from panel upgrades and conduit installations to LED lighting solutions."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/hero.jpg"
-    />
-    <meta property="og:url" content="https://toptier-electrical.com/gallery" />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/gallery" />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link rel="preload" as="image" href="/assets/images/hero.jpg" />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-    <!-- Structured data -->
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "Electrician",
-        "name": "Top Tier Electrical",
-        "url": "https://toptier-electrical.com/",
-        "telephone": "+1-616-334-7159",
-        "email": "info@toptier-electrical.com",
-        "areaServed": [
-          "West Michigan",
-          "Holland, MI",
-          "Grand Rapids, MI",

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 107
  26 147 141
  27  75 154
  28  42 154
  30 156 162
  31  42 171
  32  76  40
  33  12 174
  35  40 124
  36  74 157
  37 150 160
  38 145  40
  39 141 124
  40 144 151
  41  76 145
  42  12 162
  44  40 105
  45  40 154
  46  40 145
  47  74 143
  48  41 164
  49  55 162
  50  55 151
  51  40 143
  52 107 141
  53 157 154
  54 157  42
  55 147  54

```

</details>


## 18. `service-areas.html` → `pages/service-areas.html`

- Score: **0.4109**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/service-areas.html__TO__pages_service-areas.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/service-areas.html__TO__pages_service-areas.html.cmp.txt`

- Unified diff line delta: **+32 / -354**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/service-areas.html b/tmp/tmp.cS0l193Uwl/src_version/pages/service-areas.html
index c904a0a..40f9a46 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/service-areas.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/service-areas.html
@@ -1,354 +1,32 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
-
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>Service Areas | West Michigan Electrician</title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="See where we work across West Michigan and what to expect when scheduling. If you’re nearby but not listed, call (616)&nbsp;334&#8209;7159 to confirm availability."
-    />
-    <meta
-      name="keywords"
-      content="service areas, West Michigan electrician, Holland electrician, Grand Rapids electrician"
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="Service Areas | West Michigan Electrician"
-    />
-    <meta
-      property="og:description"
-      content="See where Top Tier Electrical serves across West Michigan."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/projects/conduit-piping.jpg"
-    />
-    <meta
-      property="og:url"
-      content="https://toptier-electrical.com/service-areas"
-    />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/service-areas" />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link
-      rel="preload"
-      as="image"
-      href="/assets/images/projects/conduit-piping.jpg"
-    />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-    <!-- Structured data -->
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "Electrician",
-        "name": "Top Tier Electrical",
-        "url": "https://toptier-electrical.com/",
-        "telephone": "+1-616-334-7159",
-        "email": "info@toptier-electrical.com",
-        "areaServed": [
-          "West Michigan",
-          "Holland, MI",
-          "Grand Rapids, MI",
-          "Byron Center, MI",
-          "Zeeland, MI",
-          "Saugatuck, MI",
-          "Hudsonville, MI",
-          "Allegan, MI"
-        ],
-        "sameAs": ["https://www.facebook.com/profile.php?id=61573826170938"],
-        "openingHoursSpecification": [
-          {
-            "@type": "OpeningHoursSpecification",
-            "dayOfWeek": [
-              "Monday",
-              "Tuesday",
-              "Wednesday",
-              "Thursday",
-              "Friday"
-            ],
-            "opens": "08:00",
-            "closes": "18:00"
-          },

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

  3 144  55
  4 157  55
  5 143 100
  6 164 155
  7 171 145
  8 160 164
  9 145 141
 10  40  12
 11 150 173
 12 164  12
 13 155  40
 14 154  40
 15  76  42
 16  12 164
 17  74 151
 18 150 164
 19 164 154
 20 155 145
 21 154  42
 22  40  72
 23 154  40
 24 141  42
 25 156 123
 26 147 145
 27  75 162
 28  42 166
 29 145 151
 30 156 143
 31  42 145
 32  76  40
 33  12 101
 34  40 162
 35  40 145
 36  74 141
 37 150 163
 38 145  40
 39 141 174
 40 144  40
 41  76 124
 42  12 157
 43  40 160
 45  40 124
 46  40 151
 47  74 145
 48  41 162
 49  55  40
 50  55 105
 51  40 154
 52 107 145
 53 157 143

```

</details>


## 19. `lighting.html` → `pages/lighting.html`

- Score: **0.4107**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/lighting.html__TO__pages_lighting.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/lighting.html__TO__pages_lighting.html.cmp.txt`

- Unified diff line delta: **+76 / -504**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/lighting.html b/tmp/tmp.cS0l193Uwl/src_version/pages/lighting.html
index 5a34463..a24d74c 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/lighting.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/lighting.html
@@ -1,508 +1,80 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
+<!--@meta
+{
+  "title": "Lighting Installation | West Michigan Electrician",
+  "description": "Lighting and fixture installation across West Michigan. Interior/exterior lighting improvements with clean workmanship.",
+  "pageType": "service",
+  "service": "lighting",
+  "city": "none",
+  "indexable": true,
+  "sitemap": {
+    "priority": 0.7,
+    "changefreq": "monthly"
+  },
+  "breadcrumb": [
+    { "name": "Home", "url": "/" },
+    { "name": "Services", "url": "/services" },
+    { "name": "Lighting", "url": "/lighting" }
+  ]
+}
+-->
+<section class="container">
+  <h1>Lighting Installation</h1>
+  <p>
+    We install and upgrade lighting systems for homes and light commercial
+    spaces with attention to layout, usability, and clean finish quality.
+    Projects are scoped clearly so fixture choice, control strategy, and
+    installation paths are aligned before work starts.
+  </p>
 
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>
-      Lighting Installation &amp; Fixtures | Custom Home Electrician
-    </title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="Thoughtful lighting layouts, dimmers, smart controls, and clean installs. Premium finish work for West Michigan homes and select commercial spaces."
-    />
-    <meta
-      name="keywords"
-      content="lighting installation, indoor lighting, outdoor lighting, LED fixtures, West Michigan electrician"
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="Lighting Installation in West Michigan | Top Tier Electrical"
-    />
-    <meta
-      property="og:description"
-      content="Indoor and outdoor lighting installs with dimmers and controls across West Michigan."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/projects/led-shelves.jpg"
-    />
-    <meta property="og:url" content="https://toptier-electrical.com/lighting" />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/lighting" />
-    <link
-      rel="preload"
-      as="image"
-      href="/assets/images/projects/led-shelves.jpg"
-    />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-    <!-- Structured data -->
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "Electrician",
-        "name": "Top Tier Electrical",
-        "url": "https://toptier-electrical.com/",

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 114
  26 147 151
  27  75 147
  28  42 150
  29 145 164
  30 156 151
  31  42 156
  32  76 147
  33  12  40
  34  40 111
  35  40 156
  36  74 163
  37 150 164
  38 145 141
  39 141 154
  40 144 154
  41  76 141
  42  12 164
  43  40 151
  44  40 157
  45  40 156
  47  74 174
  48  41  40
  49  55 127
  50  55 145
  51  40 163
  52 107 164
  53 157  40

```

</details>


## 20. `index.html` → `pages/index.html`

- Score: **0.4103**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/index.html__TO__pages_index.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/index.html__TO__pages_index.html.cmp.txt`

- Unified diff line delta: **+100 / -784**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/index.html b/tmp/tmp.cS0l193Uwl/src_version/pages/index.html
index b0b1b67..6474a61 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/index.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/index.html
@@ -1,786 +1,102 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
-
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>Electrician in West Michigan | Top Tier Electrical</title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="Licensed &amp; insured electrician serving West Michigan. Panel upgrades, EV chargers, lighting, and reliable troubleshooting. Get a clear estimate—call (616)&nbsp;334&#8209;7159."
-    />
-    <meta
-      name="keywords"
-      content="electrician, West Michigan, panel upgrades, EV charger installation, lighting, electrical repairs"
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="Electrician in West Michigan | Top Tier Electrical"
-    />
-    <meta
-      property="og:description"
-      content="Licensed &amp; insured electrician serving West Michigan for panel upgrades, EV chargers, lighting, and troubleshooting."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/hero.jpg"
-    />
-    <meta property="og:url" content="https://toptier-electrical.com/" />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/" />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link rel="preload" as="image" href="/assets/images/hero.jpg" />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-
-    <!-- Structured data -->
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "Electrician",
-        "name": "Top Tier Electrical",
-        "url": "https://toptier-electrical.com/",
-        "telephone": "+1-616-334-7159",
-        "email": "info@toptier-electrical.com",
-        "areaServed": [
-          "West Michigan",
-          "Holland, MI",
-          "Grand Rapids, MI",
-          "Byron Center, MI",
-          "Zeeland, MI",
-          "Saugatuck, MI",
-          "Hudsonville, MI",
-          "Allegan, MI"
-        ],
-        "sameAs": ["https://www.facebook.com/profile.php?id=61573826170938"],
-        "openingHoursSpecification": [
-          {
-            "@type": "OpeningHoursSpecification",
-            "dayOfWeek": [
-              "Monday",
-              "Tuesday",
-              "Wednesday",
-              "Thursday",
-              "Friday"
-            ],
-            "opens": "08:00",
-            "closes": "18:00"
-          },
-          {
-            "@type": "OpeningHoursSpecification",
-            "dayOfWeek": ["Saturday"],
-            "opens": "09:00",
-            "closes": "13:00"
-          }

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 105
  26 147 154
  27  75 145
  28  42 143
  29 145 164
  30 156 162
  31  42 151
  32  76 143
  33  12 151
  34  40 141
  35  40 156
  36  74  40
  37 150 151
  38 145 156
  39 141  40
  40 144 127
  41  76 145
  42  12 163
  43  40 164
  45  40 115
  46  40 151
  47  74 143
  48  41 150
  49  55 151
  50  55 147
  51  40 141
  52 107 156
  53 157  40

```

</details>


## 21. `panel-upgrades.html` → `pages/panel-upgrades.html`

- Score: **0.4089**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/panel-upgrades.html__TO__pages_panel-upgrades.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/panel-upgrades.html__TO__pages_panel-upgrades.html.cmp.txt`

- Unified diff line delta: **+32 / -532**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/panel-upgrades.html b/tmp/tmp.cS0l193Uwl/src_version/pages/panel-upgrades.html
index 5d149e8..dfd4adc 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/panel-upgrades.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/panel-upgrades.html
@@ -1,532 +1,32 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
-
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>
-      Electrical Panel Upgrade &amp; Service Upgrade | West Michigan Electrician
-    </title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="Clean, code-compliant electrical panel upgrades and service upgrades in West Michigan. Clear scope, tidy installs, and reliable long-term results."
-    />
-    <meta
-      name="keywords"
-      content="panel upgrades, fuse box replacement, electrical service upgrade, West Michigan electrician"
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="Panel Upgrades in West Michigan | Top Tier Electrical"
-    />
-    <meta
-      property="og:description"
-      content="Code-aware panel upgrades for safer, higher-capacity electrical service in West Michigan."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/projects/control-cabinet.jpg"
-    />
-    <meta
-      property="og:url"
-      content="https://toptier-electrical.com/panel-upgrades"
-    />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link
-      rel="canonical"
-      href="https://toptier-electrical.com/panel-upgrades"
-    />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link
-      rel="preload"
-      as="image"
-      href="/assets/images/projects/control-cabinet.jpg"
-    />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-    <!-- Structured data -->
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "Electrician",
-        "name": "Top Tier Electrical",
-        "url": "https://toptier-electrical.com/",
-        "telephone": "+1-616-334-7159",
-        "email": "info@toptier-electrical.com",
-        "areaServed": [
-          "West Michigan",
-          "Holland, MI",
-          "Grand Rapids, MI",
-          "Byron Center, MI",
-          "Zeeland, MI",
-          "Saugatuck, MI",
-          "Hudsonville, MI",
-          "Allegan, MI"
-        ],
-        "sameAs": ["https://www.facebook.com/profile.php?id=61573826170938"],
-        "openingHoursSpecification": [
-          {
-            "@type": "OpeningHoursSpecification",
-            "dayOfWeek": [
-              "Monday",
-              "Tuesday",
-              "Wednesday",
-              "Thursday",

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

  3 144  55
  4 157  55
  5 143 100
  6 164 155
  7 171 145
  8 160 164
  9 145 141
 10  40  12
 11 150 173
 12 164  12
 13 155  40
 14 154  40
 15  76  42
 16  12 164
 17  74 151
 18 150 164
 19 164 154
 20 155 145
 21 154  42
 22  40  72
 23 154  40
 24 141  42
 25 156 105
 26 147 154
 27  75 145
 28  42 143
 29 145 164
 30 156 162
 31  42 151
 32  76 143
 33  12 141
 34  40 154
 36  74 120
 37 150 141
 38 145 156
 39 141 145
 40 144 154
 41  76  40
 42  12 125
 43  40 160
 44  40 147
 45  40 162
 46  40 141
 47  74 144
 48  41 145
 49  55 163
 50  55  40
 51  40 174
 52 107  40
 53 157 127

```

</details>


## 22. `services.html` → `pages/services.html`

- Score: **0.3842**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/services.html__TO__pages_services.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/services.html__TO__pages_services.html.cmp.txt`

- Unified diff line delta: **+44 / -660**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/services.html b/tmp/tmp.cS0l193Uwl/src_version/pages/services.html
index 56054cc..a46888d 100644
--- a/tmp/tmp.cS0l193Uwl/root_version/services.html
+++ b/tmp/tmp.cS0l193Uwl/src_version/pages/services.html
@@ -1,660 +1,44 @@
-<!doctype html>
-<html lang="en">
-  <head>
-    <!-- Google tag (gtag.js) -->
-    <script
-      async
-      src="https://www.googletagmanager.com/gtag/js?id=G-FTQKB78PLE"
-    ></script>
-    <script>
-      window.dataLayer = window.dataLayer || [];
-      function gtag() {
-        dataLayer.push(arguments);
-      }
-      gtag("js", new Date());
-
-      gtag("config", "G-FTQKB78PLE");
-    </script>
-    <meta charset="UTF-8" />
-    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
-    <meta name="robots" content="index, follow" />
-    <title>
-      Electrical Services | West Michigan Electrician | Top Tier Electrical
-    </title>
-    <!-- SEO meta tags -->
-    <meta
-      name="description"
-      content="West Michigan electrician for custom homes, service upgrades, EV chargers, lighting, energy solutions, and generators. Clear scope, clean installs, code-compliant results."
-    />
-    <meta
-      name="keywords"
-      content="electrical services, panel upgrades, EV charger installation, lighting, West Michigan electrician"
-    />
-    <meta name="author" content="Top Tier Electrical" />
-    <!-- Open Graph / Social meta -->
-    <meta
-      property="og:title"
-      content="Electrical Services in West Michigan | Top Tier Electrical"
-    />
-    <meta
-      property="og:description"
-      content="Panel upgrades, EV chargers, lighting, troubleshooting, generators, and emergency service in West Michigan."
-    />
-    <meta property="og:type" content="website" />
-    <meta
-      property="og:image"
-      content="https://toptier-electrical.com/assets/images/hero.jpg"
-    />
-    <meta property="og:url" content="https://toptier-electrical.com/services" />
-    <meta name="twitter:card" content="summary_large_image" />
-    <link rel="canonical" href="https://toptier-electrical.com/services" />
-    <link rel="preconnect" href="https://fonts.googleapis.com" />
-    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link
-      rel="preload"
-      as="style"
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-    />
-    <link
-      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-      rel="stylesheet"
-      media="print"
-      onload="this.media = 'all'"
-    />
-    <noscript
-      ><link
-        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
-        rel="stylesheet"
-    /></noscript>
-    <link rel="preload" href="css/design-tokens.css" as="style" />
-    <link rel="preload" href="styles.css" as="style" />
-    <link rel="preload" href="css/components.css" as="style" />
-    <link rel="preload" as="image" href="/assets/images/hero.jpg" />
-    <link rel="stylesheet" href="css/design-tokens.css" />
-    <link rel="stylesheet" href="styles.css" />
-    <link rel="stylesheet" href="css/components.css" />
-    <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg" />
-    <!-- Structured data -->
-    <script type="application/ld+json">
-      {
-        "@context": "https://schema.org",
-        "@type": "Electrician",
-        "name": "Top Tier Electrical",
-        "url": "https://toptier-electrical.com/",
-        "telephone": "+1-616-334-7159",
-        "email": "info@toptier-electrical.com",
-        "areaServed": [
-          "West Michigan",
-          "Holland, MI",
-          "Grand Rapids, MI",
-          "Byron Center, MI",
-          "Zeeland, MI",
-          "Saugatuck, MI",
-          "Hudsonville, MI",
-          "Allegan, MI"
-        ],
-        "sameAs": ["https://www.facebook.com/profile.php?id=61573826170938"],
-        "openingHoursSpecification": [
-          {
-            "@type": "OpeningHoursSpecification",
-            "dayOfWeek": [
-              "Monday",
-              "Tuesday",
-              "Wednesday",
-              "Thursday",
-              "Friday"
-            ],
-            "opens": "08:00",
-            "closes": "18:00"
-          },
-          {
-            "@type": "OpeningHoursSpecification",
-            "dayOfWeek": ["Saturday"],
-            "opens": "09:00",
-            "closes": "13:00"

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   3 144  55
   4 157  55
   5 143 100
   6 164 155
   7 171 145
   8 160 164
   9 145 141
  10  40  12
  11 150 173
  12 164  12
  13 155  40
  14 154  40
  15  76  42
  16  12 164
  17  74 151
  18 150 164
  19 164 154
  20 155 145
  21 154  42
  22  40  72
  23 154  40
  24 141  42
  25 156 105
  26 147 154
  27  75 145
  28  42 143
  29 145 164
  30 156 162
  31  42 151
  32  76 143
  33  12 141
  34  40 154
  36  74 123
  37 150 145
  38 145 162
  39 141 166
  40 144 151
  41  76 143
  42  12 145
  43  40 163
  45  40 151
  46  40 156
  47  74  40
  48  41 127
  49  55 145
  50  55 163
  51  40 164
  52 107  40
  53 157 115
  54 157 151

```

</details>


## 23. `Past_work_webp/Lighting.webp` → `pages/lighting.html`

- Score: **0.3739**

- Diff evidence: `_audit_root_vs_src/fuzzy_diffs/Past_work_webp_Lighting.webp__TO__pages_lighting.html.diff`

- Byte evidence: `_audit_root_vs_src/fuzzy_byte_diffs/Past_work_webp_Lighting.webp__TO__pages_lighting.html.cmp.txt`

- Unified diff line delta: **+0 / -0**


<details><summary>Diff preview</summary>

```diff

diff --git a/tmp/tmp.cS0l193Uwl/root_version/Past_work_webp/Lighting.webp b/tmp/tmp.cS0l193Uwl/src_version/pages/lighting.html
index 0ed798d..a24d74c 100644
Binary files a/tmp/tmp.cS0l193Uwl/root_version/Past_work_webp/Lighting.webp and b/tmp/tmp.cS0l193Uwl/src_version/pages/lighting.html differ

```

</details>


<details><summary>CMP byte-offset preview (first 50 lines)</summary>

```text

   1 122  74
   2 111  41
   3 106  55
   4 106  55
   5 304 100
   6 216 155
   7   1 145
   8   0 164
   9 127 141
  10 105  12
  11 102 173
  12 120  12
  13 126  40
  14 120  40
  15  70  42
  16  40 164
  17 270 151
  18 216 164
  19   1 154
  20   0 145
  21 120  42
  22 173  72
  23   6  40
  24 235  42
  25   1 114
  26  52 151
  27 260 147
  28   4 150
  29 204 164
  30   3 151
  31  76 156
  32 141 147
  33  56  40
  34 223 111
  35 107 156
  36 244 163
  37  42 164
  38  44 141
  39  63 154
  40 243 154
  41 122 141
  42 213 164
  43  22 151
  44 160 157
  45  14 156
  46  11  40
  47 147 174
  48 155  40
  49 133 127
  50 272 145

```

</details>
