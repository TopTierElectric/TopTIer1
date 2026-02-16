export type LeadEvent =
  | { event: 'click_call'; phone: string; page_path?: string }
  | { event: 'click_text'; phone: string; page_path?: string }
  | { event: 'lead_form_click'; form: 'home' | 'contact' | 'booking'; page_path?: string }
  | { event: 'lead_form_submit'; form: 'home' | 'contact' | 'booking'; page_path?: string }
  | { event: 'lead_form_success'; form: 'home' | 'contact' | 'booking'; page_path?: string }

export function buildPagePath(): string | undefined {
  if (typeof window === 'undefined') return undefined
  return window.location.pathname
}
