import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Trophy } from "lucide-react";
import { TournamentListClient } from "@/features/tournaments/components/TournamentListClient";
import { getActiveTournamentsAction } from "@/features/tournaments/actions/tournament.actions";

export default async function TournamentsPage() {
  const result = await getActiveTournamentsAction();
  const tournaments = result.success && result.data ? result.data : [];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/80 mb-6">
                <Trophy className="w-4 h-4 text-[#FF6B35]" />
                Tournaments
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Discover{" "}
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">
                  Tournaments
                </span>
              </h1>
              <p className="text-lg text-white/60 max-w-3xl mx-auto">
                Find and register for sports tournaments happening across India. From local
                school events to national championships.
              </p>
            </div>
          </div>
        </section>

        <TournamentListClient initialTournaments={tournaments} />
      </main>
      <Footer />
    </>
  );
}
