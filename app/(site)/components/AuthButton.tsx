"use client";

import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function AuthButton() {
  const { data: session, isPending } = useSession();

  const handleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isPending) {
    return <div className="w-24 h-10 bg-white/10 rounded-lg animate-pulse" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full border-2 border-white/20"
          />
        )}
        <span className="hidden sm:inline text-sm text-white/90">
          {session.user.name}
        </span>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 text-sm font-medium border border-white/20"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="px-4 py-2 bg-white text-purple-600 hover:bg-white/90 rounded-lg transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-white/25"
    >
      Login met GitHub
    </button>
  );
}
