import { MetadataRoute } from "next";
import { allProjects } from "@/lib/projects";

const BASE = "https://www.daniloaguillar.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = allProjects.map((p) => ({
    url: `${BASE}/projetos/${p.key}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...projectPages,
  ];
}
