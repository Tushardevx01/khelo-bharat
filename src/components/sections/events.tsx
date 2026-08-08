import { getAllTournaments } from "@/actions/tournament.actions";
import { EventsClient } from "./events-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function EventsSection() {
  const result = await getAllTournaments(1, 3).catch(() => null);
  const events = result?.data ?? [];

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Upcoming Events
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Don&apos;t miss out on exciting tournaments.
            </p>
          </div>
          <Button variant="outline" className="sm:flex text-primary border-primary hover:bg-primary/5" asChild>
            <Link href="/tournaments">
              View All Events
            </Link>
          </Button>
        </div>

        {events.length > 0 ? <EventsClient events={events} /> : (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No upcoming tournaments are available yet.
          </div>
        )}
      </div>
    </section>
  );
}
