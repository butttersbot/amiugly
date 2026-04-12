import { MetadataRoute } from "next"

const blogSlugs = [
  "facial-symmetry", "history-of-beauty-standards", "selfie-angle-lie",
  "golden-ratio", "10-things-attractive", "ai-cant-tell-ugly",
  "jawline-industrial-complex", "beauty-standards-around-world",
  "eye-shape-meaning", "psychology-first-impressions",
  "cheekbones", "social-media-beauty"
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/gallery", "/blog", "/privacy", "/terms"].map(path => ({
    url: `https://amiugly.lol${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }))

  const blogPages = blogSlugs.map(slug => ({
    url: `https://amiugly.lol/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
