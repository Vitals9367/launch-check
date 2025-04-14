"use client";

import { ProjectsContainer } from "@/components/organisms/projects/projects-container";
import { ErrorBoundary } from "@/components/organisms/error-boundary";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <ErrorBoundary
        fallback={<div>Something went wrong loading projects.</div>}
      >
        <ProjectsContainer />
      </ErrorBoundary>
    </div>
  );
}
