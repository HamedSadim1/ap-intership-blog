import { getCurrentUser, getAuthorFromSanity } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

/**
 * Voorbeeld: Admin-only pagina
 * Gebruikt server-side role verificatie via Sanity
 */
export default async function AdminPage() {
  // Server-side user fetch
  const user = await getCurrentUser();

  // Check if user is logged in
  if (!user) {
    redirect("/");
  }

  // Fetch author data from Sanity (includes role)
  const author = await getAuthorFromSanity();

  // Role checking - alleen admins toegestaan
  if (!author || author.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <p className="text-white/90 mb-4">
            Welkom, <strong>{author.username}</strong>
          </p>
          <p className="text-white/70 text-sm">Email: {author.email}</p>
          <p className="text-white/70 text-sm">
            Role:{" "}
            <span className="text-yellow-400 font-semibold">{author.role}</span>
          </p>
          <p className="text-green-400 mt-4 font-semibold">
            ✅ Admin toegang geverifieerd via Sanity
          </p>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h2 className="text-lg font-semibold text-white mb-2">
              Beveiligingsinfo:
            </h2>
            <ul className="text-white/80 text-sm space-y-2 list-disc list-inside">
              <li>
                Admin emails worden beheerd via ADMIN_EMAILS environment
                variable
              </li>
              <li>Role verificatie gebeurt server-side via Sanity queries</li>
              <li>Geen client-side role checks - volledig secure</li>
              <li>Sanity is single source of truth voor gebruikers roles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
