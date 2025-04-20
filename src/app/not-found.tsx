import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const NotFound = async () => {
  const session = await auth();

  if (session) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  redirect("/");
};

export default NotFound;
