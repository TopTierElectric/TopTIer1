import Link from "next/link";
import { buildMetadata, pageTitle } from "@/lib/seo/metadata";
import { SERVICES } from "@/config/services";
import { SITE } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { CallTextCTA } from "@/components/cta/CallTextCTA";

export const metadata = buildMetadata({
  title: pageTitle("Residential Electrician"),
  pathname: "/residential",
  description:
    "Residential electrical service for upgrades, troubleshooting, EV chargers, generators, lighting, and safe code-compliant repairs. Clear communication, clean workmanship.",
});

export default function ResidentialPage() {
  const residential = SERVICES.filter(
    (s) => s.primaryIntent === "residential" || s.primaryIntent === "both",
  );

  return (
    <main>
      <h1>Residential Electrician</h1>

      <p>
        We help homeowners solve electrical problems safely—whether you need a
        panel upgrade, EV charger circuit, generator transfer switch, or
        troubleshooting for flickering lights and tripping breakers.
      </p>

      <CallTextCTA />

      <section>
        <h2>Residential Services</h2>
        <ul>
          {residential.map((s) => (
            <li key={s.slug}>
              <Link href={s.slug}>
                <strong>{s.name}</strong>
              </Link>
              <div>{s.short}</div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>What You Can Expect</h2>
        <ul>
          <li>Clear scope before we start (what we’re doing and why)</li>
          <li>Code-compliant work and clean finishing</li>
          <li>Upfront communication on permits/inspections when required</li>
          <li>
            Respect for your home: tidy workspace, labeled circuits when
            applicable
          </li>
        </ul>
      </section>

      <section>
        <h2>Common Homeowner Questions</h2>
        <h3 id="pricing">How does pricing work?</h3>
        <p>
          Electrical work depends on access, load requirements, panel condition,
          and permitting. We’ll explain options and tradeoffs so you can choose
          the best path.
        </p>

        <h3 id="safety">Is this an emergency?</h3>
        <p>
          If you smell burning, see arcing, or have warm outlets/switches, stop
          using that circuit and call immediately. If there’s smoke or fire
          risk, call emergency services first.
        </p>
      </section>

      <section>
        <h2>Request Residential Service</h2>
        <p>Serving: {SITE.serviceAreas.map((a) => a.name).join(", ")}</p>
        <LeadForm form="home" />
      </section>
    </main>
  );
}
