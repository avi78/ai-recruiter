"use client";

import React, { useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { UserDetailContext } from "@/context/userdetailcontext";

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const createNewUser = async () => {
      try {
        // Step 1: Get current user
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw new Error(`Auth error: ${userError.message}`);
        if (!currentUser) return;

        // Step 2: Check if user already exists
        const { data: existingUsers, error: existingError } = await supabase
          .from("Users")
          .select("*")
          .eq("email", currentUser.email);

        if (existingError) throw new Error(`Check error: ${existingError.message}`);

        if (!existingUsers || existingUsers.length === 0) {
          // Step 3: Insert new user
          const { error: insertError } = await supabase.from("Users").insert([
            {
              email: currentUser.email,
              name: currentUser.user_metadata?.name || "",
              picture: currentUser.user_metadata?.avatar_url || "",
              credits: 10,
            },
          ]);

          if (insertError) throw new Error(`Insert error: ${insertError.message}`);

          // Step 4: Fetch inserted user
          const { data: insertedUser, error: fetchError } = await supabase
            .from("Users")
            .select("*")
            .eq("email", currentUser.email)
            .single();

          if (fetchError) throw new Error(`Fetch inserted error: ${fetchError.message}`);

          setUser(insertedUser);
        } else {
          setUser(existingUsers[0]);
        }
      } catch (err) {
        console.error("❌ Supabase user management error:", err.message || err);
      }
    };

    createNewUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default UserProvider;

// ✅ Custom Hook for accessing user
export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
