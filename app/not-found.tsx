import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[800px] px-6 py-28 md:px-10 text-center">
      <p className="font-mono text-xs text-accent mb-4">404 · Signal Interrupted</p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
        No route <span className="font-editorial-italic text-accent">detected</span>.
      </h1>
      <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
        The requested path does not exist on this portfolio. Return to the main signal or press
        Cmd/Ctrl+K to navigate.
      </p>

      <div className="my-10 flex justify-center" aria-hidden="true">
        <svg width="240" height="36" viewBox="0 0 240 36" fill="none">
          <path
            d="M 0 18 L 88 18 L 96 18 Q 100 13 104 18 L 112 18 L 115 24 L 120 4 L 125 32 L 130 14 L 134 18 L 240 18"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <Link href="/">
        <Button variant="accent">
          <ArrowLeft className="h-4 w-4" />
          <span>Return Home</span>
        </Button>
      </Link>
    </section>
  );
}
