"use client";

import Link from "next/link";
import { Folder } from "lucide-react";
import { type Project } from "@/server/db/schema/projects";
import { projectRoute } from "@/routes";
interface ProjectItemProps {
  project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
  return (
    <Link
      href={`${projectRoute}/${project.id}`}
      className="block rounded-lg border p-4 transition-colors hover:bg-gray-50"
    >
      <div className="flex items-center">
        <Folder className="mr-3 h-5 w-5 text-blue-500" />
        <span className="font-medium">{project.name}</span>
      </div>
    </Link>
  );
}
