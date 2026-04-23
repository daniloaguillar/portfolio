import type { Metadata } from "next";
import { allProjects } from "@/lib/projects";
import { translations } from "@/lib/translations";
import ProjectPageContent from "@/components/ProjectPageContent";

const BASE_URL = "https://www.daniloaguillar.com.br";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.key }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = allProjects.find((p) => p.key === params.slug);
  if (!project) return {};

  const items = translations.pt.projects.items as Record<
    string,
    { description: string; deliverables: string }
  >;
  const item = items[params.slug];
  const description = item?.description ?? "Projeto de design por Danilo Aguillar.";
  const pageUrl = `${BASE_URL}/projetos/${project.key}`;
  const ogImage = project.image
    ? [{ url: project.image, width: 1200, height: 630, alt: project.name }]
    : undefined;

  return {
    title: project.name,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${project.name} — Danilo Aguillar`,
      description,
      url: pageUrl,
      siteName: "Danilo Aguillar",
      locale: "pt_BR",
      type: "website",
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Danilo Aguillar`,
      description,
      images: ogImage?.map((i) => i.url),
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProjectPageContent slug={params.slug} />;
}
