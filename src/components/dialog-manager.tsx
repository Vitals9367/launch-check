import React from "react";
import DeleteAccountDialog from "@/components/profile/delete-account-dialog";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { DeleteProjectDialog } from "@/components/project-page/delete-project-dialog";
import { ProjectSettingsDialog } from "./project-page/project-settings-dialog";

const DialogManager = () => {
  return (
    <>
      <DeleteAccountDialog />
      <CreateProjectDialog />
      <DeleteProjectDialog />
      <ProjectSettingsDialog />
    </>
  );
};

export default DialogManager;
