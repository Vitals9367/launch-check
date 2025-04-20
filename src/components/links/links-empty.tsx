"use client";

import { Link, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCreateLinkDialogStore } from "@/store/use-create-link-dialog-store";

export function LinksEmpty() {
  const { onOpen } = useCreateLinkDialogStore();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-full p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Link className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No links yet
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            Add your first link to start tracking URLs for this project.
          </p>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={onOpen}
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add First Link
          </Button>
        </div>
      </Card>
    </div>
  );
}
