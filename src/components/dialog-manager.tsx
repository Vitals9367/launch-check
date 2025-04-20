import React from "react";
import DeleteAccountDialog from "@/components/profile/delete-account-dialog";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { DeleteProjectDialog } from "@/components/project-page/delete-project-dialog";
import { ProjectSettingsDialog } from "./project-page/project-settings-dialog";
import { ScanLimitDialog } from "@/components/dialogs/scan-limit-dialog";

const DialogManager = () => {
  return (
    <>
      <DeleteAccountDialog />
      <CreateProjectDialog />
      <DeleteProjectDialog />
      <ProjectSettingsDialog />
      <ScanLimitDialog />
    </>
  );
};

export default DialogManager;
