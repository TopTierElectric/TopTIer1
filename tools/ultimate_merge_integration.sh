#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'

################################################################################
# CONFIG – tweak if needed
################################################################################
TOPTIER_REMOTE="https://github.com/TopTierElectric/TopTIer1.git"
BRANCH_NAME="integration/ultimate-merge-$(date +%Y%m%d%H%M%S)"
VERIFY_CMDS=(
  "npm run lint --silent"
  "npm run build --silent"
  "npm test --silent"
  "npm run export --silent  # Next.js static export check"
)
MERGE_REPORT="merge_report_${BRANCH_NAME//\//_}.html"
################################################################################

echo -e "\n=== 1. Environment sanity check ==="
if ! [ -f package.json ] || ! rg -q '"next' package.json; then
  echo "❌  Must run from Clean-site root containing Next.js project" >&2
  exit 1
fi

echo -e "\n=== 2. Update Clean-site main & create branch ==="
git checkout main
git pull --ff-only
git switch -c "$BRANCH_NAME"

echo -e "\n=== 3. Add & fetch TopTIer1 remote ==="
if ! git remote | rg -q '^toptier$'; then git remote add toptier "$TOPTIER_REMOTE"; fi
git fetch toptier --quiet

echo -e "\n=== 4. Merge histories (keep all files, no auto-commit) ==="
git merge toptier/main --allow-unrelated-histories --no-commit || true

echo "    Auto-resolving trivial duplicates ..."
# Keep Clean-site’s versions for Cloudflare config & Next specific files
for f in _headers _redirects wrangler.toml wrangler.jsonc; do
  git checkout --ours -- "$f" 2>/dev/null || true
done
# Remove TopTIer1 legacy static duplicates (they will exist in React)
git rm -rf --ignore-unmatch index.html *.html src/partials || true

git add -A
git commit -m "chore: baseline merge of TopTIer1 into Clean-site"

###############################################################################
run_verify() {
  local label="$1"
  echo -e "\n🔍  Verification ($label)"
  for c in "${VERIFY_CMDS[@]}"; do
    echo "→ $c"
    eval "$c"
  done
}
###############################################################################

run_verify "post-baseline"

echo -e "\n=== 5. Surface all content conflicts for review ==="
echo "    Generating TODO list of *.conflicted* and <<<<<< markers ..."
rg --line-number '<<<<<<<|>>>>>>>' . || true

echo -e "\n=== 6. Cherry-pick high-value TopTIer1 content ==="
# Example: port service page markdown blocks
patch <<'SERVICES'
diff --git a/pages/[service].jsx b/pages/[service].jsx
@@
   const pagesContent = {
+    'residential-electrical': {
+      title: 'Residential Electrical',
+      intro: 'High-end custom homes, remodels and additions.',
+      heroCTA: { label: 'Request Quote', href: '/booking' },
+      contentHtml: `<section class="container prose"><p>Full turnkey service upgrades, lighting design and code-compliant wiring.</p></section>`
+    },
+    'commercial-electrical': {
+      title: 'Commercial Electrical',
+      intro: 'Tenant build-outs, service upgrades & maintenance.',
+      heroCTA: { label: 'Schedule Walk-through', href: '/booking' },
+      contentHtml: `<section class="container prose"><p>Power distribution, lighting retrofits and emergency backup integration.</p></section>`
+    },
SERVICES
git add pages/[service].jsx
git commit -m "feat: import residential & commercial service pages from TopTIer1"

run_verify "service pages"

echo -e "\n=== 7. Integrate full booking form fields ==="
patch <<'BOOKING'
diff --git a/pages/booking/index.jsx b/pages/booking/index.jsx
@@
-      <Hero
-        title="Schedule Service Online"
-        subtitle="Choose a convenient date and time..."
+      <Hero
+        title="Schedule Service Online"
+        subtitle="Pick a date & time that works for you."
       />
-      {/* TODO: form coming soon */}
+      <Form formId="booking" />
BOOKING
git add pages/booking/index.jsx
git commit -m "feat: embed complete booking <Form>"

run_verify "booking form"

echo -e "\n=== 8. Prune obsolete TopTIer1 assets ==="
git rm -rf --ignore-unmatch script.js styles/styles.css src/scripts || true
git commit -m "chore: prune legacy scripts/styles superseded by Next"

run_verify "cleanup"

echo -e "\n=== 9. Create HTML diff report for final audit ==="
npx --yes git-difftool-html HEAD~4..HEAD > "$MERGE_REPORT"
echo "    ➜  Open $MERGE_REPORT in your browser to inspect all changes."

echo -e "\n=== 10. Push branch ==="
git push -u origin "$BRANCH_NAME"

cat <<EOF2

✅  Ultimate integration branch '$BRANCH_NAME' pushed.
   • Every commit passed lint → build → test → export.
   • Manual TODO markers (<<<<<<< >>>>>>>) remain for any nuanced merges.
   • Review $MERGE_REPORT locally, fix TODOs, then open a PR into main.

EOF2
