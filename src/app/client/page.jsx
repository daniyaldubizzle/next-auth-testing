import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
const Client = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/client");
  }
  return (
    <>
      <h1>Client Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </>
  );
};

export default Client;
