export type Service = {
  slug: string
  name: string
  short: string
  primaryIntent: 'residential' | 'commercial' | 'both'
  // For AEO quick answers near top of the page
  quickAnswers: Array<{ q: string; a: string; anchor?: string }>
}

export const SERVICES: Service[] = [
  {
    slug: '/panel-upgrades',
    name: 'Panel Upgrades',
    short: 'Upgrade or replace electrical panels for safety, capacity, and code compliance.',
    primaryIntent: 'both',
    quickAnswers: [
      {
        q: 'How long does a panel upgrade take?',
        a: 'Most upgrades are completed in a single day, but timelines depend on service size, meter location, and utility coordination.',
        anchor: '#timeline',
      },
      {
        q: 'Will my power be off?',
        a: 'Yes—power is typically off during the swap. We plan the shutdown window and confirm restoration steps before we start.',
        anchor: '#power-off',
      },
      {
        q: 'Do permits matter?',
        a: 'Yes. Permits and inspections protect you and ensure your electrical service meets current code requirements.',
        anchor: '#permits',
      },
    ],
  },
  {
    slug: '/ev-charger-installation',
    name: 'EV Charger Installation',
    short: 'Home and commercial EV charger installs, load checks, and circuit upgrades.',
    primaryIntent: 'both',
    quickAnswers: [
      {
        q: 'Do I need a panel upgrade for an EV charger?',
        a: 'Not always. We perform a load evaluation to verify your current panel capacity, identify breaker space, and recommend the safest path for your vehicle and daily charging habits.',
        anchor: '#load-eval',
      },
      {
        q: 'Hardwired vs plug-in?',
        a: 'Hardwired installs are usually preferred for higher-amp charging and long-term reliability, while plug-in setups can fit lower-amp situations with the proper receptacle and dedicated circuit protection.',
        anchor: '#hardwired-vs-plugin',
      },
    ],
  },
  {
    slug: '/generator-installation',
    name: 'Generator Installation',
    short: 'Standby generator wiring, transfer switches, and outage readiness upgrades.',
    primaryIntent: 'residential',
    quickAnswers: [
      {
        q: 'What does a transfer switch do?',
        a: 'A transfer switch safely moves power from utility service to generator output so selected circuits stay energized during outages without backfeeding utility lines.',
        anchor: '#transfer-switch',
      },
      {
        q: 'How do I choose generator size?',
        a: 'We calculate your essential loads, startup demands, and future needs so the generator can run priority appliances reliably and avoid nuisance trips during extended outages.',
        anchor: '#generator-sizing',
      },
    ],
  },
  {
    slug: '/emergency',
    name: 'Emergency Electrical Service',
    short: 'Fast response for urgent electrical hazards and power issues.',
    primaryIntent: 'both',
    quickAnswers: [
      {
        q: 'What should I do if I smell burning?',
        a: 'If safe, turn off the affected circuit and call immediately. If there is smoke, sparking, or fire risk, leave the area and contact emergency services first.',
        anchor: '#burning-smell',
      },
      {
        q: 'Do you troubleshoot partial power loss?',
        a: 'Yes. We diagnose panel faults, failed breakers, damaged conductors, and utility-side indicators to restore service safely and document the repair options clearly.',
        anchor: '#partial-power-loss',
      },
    ],
  },
]
