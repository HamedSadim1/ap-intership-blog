"use client";

import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { Suspense, type ReactNode } from "react";
import { GithubIcon } from "./svgs";

// Constanten voor herbruikbare waarden
const BUTTON_SIZE = "w-10 h-10" as const;
const BASE_BUTTON_STYLES =
  "group relative rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer" as const;
const BORDER_STYLES =
  "border-2 border-white/20 group-hover:border-white/40" as const;

// Herbruikbare Tooltip component
function Tooltip({ children }: { children: ReactNode }) {
  return (
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      {children}
    </span>
  );
}

// Herbruikbare Avatar component
function Avatar({
  image,
  name,
}: {
  image?: string | null;
  name?: string | null;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name || "User"}
        width={40}
        height={40}
        className={`${BUTTON_SIZE} rounded-lg ${BORDER_STYLES}`}
        priority
      />
    );
  }

  return (
    <div
      className={`${BUTTON_SIZE} rounded-lg bg-white/10 ${BORDER_STYLES} flex items-center justify-center`}
    >
      <span className="text-white font-semibold text-lg">
        {name?.charAt(0).toUpperCase() || "U"}
      </span>
    </div>
  );
}

// Skeleton component met exacte afmetingen om layout shift te voorkomen
function AuthButtonSkeleton() {
  return (
    <div className={BUTTON_SIZE}>
      <div
        className={`${BUTTON_SIZE} bg-white/10 rounded-lg animate-pulse`}
        role="status"
        aria-label="Laden..."
      >
        <span className="sr-only">Laden...</span>
      </div>
    </div>
  );
}

// Generieke auth handler met error handling
async function handleAuthAction(
  action: () => Promise<unknown>,
  actionName: string,
) {
  try {
    await action();
  } catch (error) {
    console.error(`${actionName} error:`, error);
  }
}

// Client component met de auth logica
function AuthButtonClient() {
  const { data: session, isPending } = useSession();

  const handleSignIn = () =>
    handleAuthAction(
      () => authClient.signIn.social({ provider: "github", callbackURL: "/" }),
      "Login",
    );

  const handleSignOut = () =>
    handleAuthAction(() => authClient.signOut(), "Logout");

  if (isPending) {
    return <AuthButtonSkeleton />;
  }

  // Ingelogd: Avatar als button voor logout
  if (session?.user) {
    const userName = session.user.name || "User";
    return (
      <button
        onClick={handleSignOut}
        className={`${BASE_BUTTON_STYLES} ${BUTTON_SIZE}`}
        aria-label={`Uitloggen (${userName})`}
        title={`Uitloggen (${userName})`}
      >
        <Avatar image={session.user.image} name={userName} />
        <Tooltip>Klik om uit te loggen</Tooltip>
      </button>
    );
  }

  // Niet ingelogd: GitHub icon button
  return (
    <button
      onClick={handleSignIn}
      className={`${BASE_BUTTON_STYLES} ${BUTTON_SIZE} bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-lg hover:shadow-white/25 flex items-center justify-center`}
      aria-label="Inloggen met GitHub"
      title="Inloggen met GitHub"
    >
      <GithubIcon className="w-5 h-5" />
      <Tooltip>Inloggen met GitHub</Tooltip>
    </button>
  );
}

// Main component met Suspense voor betere loading state
export default function AuthButton() {
  return (
    <Suspense fallback={<AuthButtonSkeleton />}>
      <AuthButtonClient />
    </Suspense>
  );
}
