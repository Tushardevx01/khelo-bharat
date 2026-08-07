import { getVerifiedSponsors } from "@/actions/sponsor.actions";
import { SponsorsClient } from "./sponsors-client";
import { Sponsor } from "@prisma/client";

// Server components can't use framer-motion directly on themselves, but we can pass standard HTML classes or use a client wrapper for the title if needed.
// However, since we want to keep the title animated, we'll just extract the title to a client component or let it be static on the server.
// Let's create a small client wrapper for the title, or we can just render it statically since it's above the fold mostly.

export async function SponsorsSection() {
  let sponsors: Sponsor[] = [];
  try {
    sponsors = await getVerifiedSponsors(6);
  } catch {
    // Ignore error
  }

  if (sponsors.length === 0) {
    return null; // Don't show the section if there are no sponsors yet
  }

  return (
    <section className="bg-background py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Trusted by Leading Brands
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Partnering with top organizations to support India&apos;s athletes.
          </p>
        </div>

        <SponsorsClient sponsors={sponsors} />
      </div>
    </section>
  );
}
