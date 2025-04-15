import React from "react";
import DeleteAccountDialog from "@/components/profile/delete-account-dialog";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { DeleteProjectDialog } from "@/components/project/delete-project-dialog";

const DialogManager = () => {
  return (
    <>
      <DeleteAccountDialog />
      <CreateProjectDialog />
      <DeleteProjectDialog />
    </>
  );
};

export default DialogManager;
