declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

// Named events — use these constants everywhere so GA4 reports stay consistent
export const GA_EVENTS = {
  WHATSAPP_CLICK:     "whatsapp_click",
  PHONE_CLICK:        "phone_click",
  BOOKING_ENQUIRY:    "booking_enquiry",
  DIRECTIONS_CLICK:   "directions_click",
} as const;
