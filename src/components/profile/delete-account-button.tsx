"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteUserDialogStore } from "@/store/use-delete-user-dialog-store";

const DeleteAccountButton = () => {
  const { onOpen: openDeleteUserDialog } = useDeleteUserDialogStore();

  return (
    <Button
      variant="outline"
      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
      onClick={openDeleteUserDialog}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete Account
    </Button>
  );
};

export default DeleteAccountButton;
