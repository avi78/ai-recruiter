"use client";

import { useUser } from "../../provider/userProvider";
import CreateOptions from "./_components/CreateOptions";
import WelcomeContainer from "./_components/WelcomeContainer";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div>
      <WelcomeContainer/>
      <h2 className="my-3 font-bold text-2xl">Dashboard</h2>
      <CreateOptions/>
    </div>
  );
}
