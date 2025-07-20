"use client";

import { useUser } from "../../provider/userProvider";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to NeuroHire</h1>
      {user ? (
        <p className="mt-2 text-gray-700">Logged in as {user.email}</p>
      ) : (
        <p className="mt-2 text-gray-500">Loading user...</p>
      )}
    </div>
  );
}
