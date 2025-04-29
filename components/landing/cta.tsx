import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="max-w-4xl mx-auto py-20 pb-40">
      <div className="text-center max-w-5xl mx-auto bg-muted py-20 px-10 md:rounded-3xl">
        <h2 className="text-4xl mb-1 tracking-tighter">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-gray-700 dark:text-gray-400 mb-8">
          Join thousands of users who are already managing their finances
          smarter with spenz.
        </p>
        <Button className="bg-primary text-white px-8 py-6 text-lg hover:opacity-90 transition-opacity">
          <Link href={"sign-in"}>Get Started Now</Link>
        </Button>
      </div>
    </section>
  );
}
