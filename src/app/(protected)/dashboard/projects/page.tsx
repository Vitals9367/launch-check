"use client";

import { ProjectsContainer } from "@/components/organisms/projects/projects-container";
import { ErrorBoundary } from "@/components/organisms/error-boundary";

export default function ProjectsPage() {
  return (
    <div>
      <ErrorBoundary
        fallback={<div>Something went wrong loading projects.</div>}
      >
        <ProjectsContainer />
      </ErrorBoundary>
    </div>
  );
}
