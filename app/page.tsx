import React from "react";

import { currentUser } from "@clerk/nextjs/server";
import Guest from "@/components/Guest";

export default async function Homepage() {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }
  return (
    <div>
      <h1>Hello Theme</h1>
    </div>
  );
}
