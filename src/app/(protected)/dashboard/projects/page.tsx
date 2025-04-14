import { ProjectsContainer } from "@/components/organisms/projects/projects-container";
import { ErrorBoundary } from "@/components/organisms/error-boundary";

export default async function ProjectsPage() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong loading projects.</div>}>
      <ProjectsContainer />
    </ErrorBoundary>
  );
}
