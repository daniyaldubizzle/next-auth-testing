"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Barber = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/barber");
    },
  });

  console.log("****************** Session", session);
  return (
    <>
      <h1>Barber Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </>
  );
};

export default Barber;
