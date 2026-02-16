// src/local-seo/thresholds.ts
export const LOCAL_SEO_THRESHOLDS = {
  // Heuristics (not Google-stated requirements). Tune for your market.
  reviews: {
    minRating: 4.5,
    minCount: 20,
    minResponseRatePercent: 90,
    freshnessDays: 30,
  },
  photos: { minCount: 20, freshnessDays: 30 },
  posts: { minPerMonth: 2, freshnessDays: 30 },

  content: {
    minResidentialHubWords: 700,
    minCommercialHubWords: 700,
    minServiceAreasWords: 350,
    minLocationWords: 500,
  },

  technical: {
    requireRobots: true,
    requireSitemap: true,
  },
} as const
