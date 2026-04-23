import { allProjects } from "@/lib/projects";
import ProjectPageContent from "@/components/ProjectPageContent";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.key }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProjectPageContent slug={params.slug} />;
}
