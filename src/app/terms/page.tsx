import Link from 'next/link';

export const metadata = {
  title: 'Terms - Remodeling Service LLC',
  description: 'Website terms for Remodeling Service LLC.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-primary hover:underline">
          Back to home
        </Link>
        <h1 className="mt-8 font-display text-4xl font-bold">Terms</h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          The information on this website is provided for general remodeling service inquiries.
          Project estimates, timelines, warranties, and availability are confirmed only in written
          agreements with Remodeling Service LLC.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Use of this website does not create a contractor-client relationship until a written
          agreement is signed.
        </p>
      </div>
    </main>
  );
}
