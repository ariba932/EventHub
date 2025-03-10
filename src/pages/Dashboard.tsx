import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Header from "@/components/layout/Header";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { User } from "@/types";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          const { data } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();

          setUser(data as User);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const { data } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();

          setUser(data as User);
          setIsLoading(false);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setIsLoading(false);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        userName={user.full_name || user.email.split("@")[0]}
        userAvatar={
          user.avatar_url ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
        }
      />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-6">
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden h-[calc(100vh-100px)]">
            <DashboardTabs />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
