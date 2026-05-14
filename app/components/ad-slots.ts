// AdSense ad unit slot IDs.
// Create units at https://www.google.com/adsense/new/u/0/pub-5249658333733157/myads/units
// and paste the 10-digit slot IDs below. Until populated, ads render as empty <ins> blocks
// (AdSense silently skips invalid slots — no visual breakage).

export const AD_SLOTS = {
  // Display - In-article (rectangle, mid-content for blog posts)
  IN_ARTICLE: process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE ?? '',
  // Display - Display ad (responsive, top of editorial pages)
  DISPLAY: process.env.NEXT_PUBLIC_AD_SLOT_DISPLAY ?? '',
  // Display - In-feed (between blog index cards)
  IN_FEED: process.env.NEXT_PUBLIC_AD_SLOT_IN_FEED ?? '',
  // Multiplex (end-of-article "related" grid)
  MULTIPLEX: process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX ?? '',
} as const
