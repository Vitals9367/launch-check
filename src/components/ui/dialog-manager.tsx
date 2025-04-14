import React from "react";
import DeleteAccountDialog from "@/components/molecules/delete-account-dialog";
import { CreateProjectDialog } from "@/components/organisms/projects/create-project-dialog";
import { DeleteProjectDialog } from "@/components/organisms/project/delete-project-dialog";

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
