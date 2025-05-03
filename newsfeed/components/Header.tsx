"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export const Header = () => {
  const router = useRouter();

  const [currentUser, setcurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setcurrentUser(null);
      } else {
        setcurrentUser(user);
      }
    };
    checkUser();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setcurrentUser(session?.user || null);
    });
  
    // Cleanup on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };


  return (
    <header className="flex justify-between items-center p-4 mb-10 bg-gray-800 text-white">
      <Link href="/" className="text-xl font-bold">
        Santhosh
      </Link>
      <nav className="space-x-4">
        <Link href="/" className="hover:text-gray-400">
          Home
        </Link>
        {currentUser ? (
          <>
            <Link href="/dashboard" className="hover:text-gray-400">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="hover:text-gray-400 cursor-pointer">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-gray-400">
              Login
            </Link>
            <Link href="/signup" className="hover:text-gray-400">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
