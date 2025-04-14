import React from "react";
import DeleteAccountDialog from "@/components/molecules/delete-account-dialog";
import { CreateProjectDialog } from "@/components/organisms/projects/create-project-dialog";

const DialogManager = () => {
  return (
    <>
      <DeleteAccountDialog />
      <CreateProjectDialog />
    </>
  );
};

export default DialogManager;
