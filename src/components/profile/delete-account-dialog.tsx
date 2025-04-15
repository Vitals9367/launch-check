"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useDeleteUserDialogStore } from "@/store/use-delete-user-dialog-store";
import { deleteUser } from "@/actions/delete-user";

const DeleteAccountDialog = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDeleteUserDialogStore();

  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useCurrentUser();

  const handleDeleteAccount = async () => {
    if (!user?.id) {
      return;
    }

    setIsLoading(true);
    await deleteUser(user?.id);
    setIsLoading(false);
    onClose();
  };

  if (!user) {
    return;
  }

  return (
    <Dialog
      modal
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-800">
              To confirm, please type your email address:{" "}
              <strong>{user?.email}</strong>
            </p>
          </div>
          <Input
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            placeholder="Enter your email"
            className="border-red-200 focus:border-red-400"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={deleteConfirmation !== user?.email || isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
