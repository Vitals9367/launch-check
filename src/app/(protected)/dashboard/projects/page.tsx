import { ProjectsContainer } from "@/components/projects/projects-container";
import { ErrorBoundary } from "@/components/error-boundary";

export default async function ProjectsPage() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong loading projects.</div>}>
      <ProjectsContainer />
    </ErrorBoundary>
  );
}
