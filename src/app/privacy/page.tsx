import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - AC Remodeling Service LLC',
  description: 'Privacy policy for AC Remodeling Service LLC.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-primary hover:underline">
          Back to home
        </Link>
        <h1 className="mt-8 font-display text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          AC Remodeling Service LLC collects only the contact information you submit through this
          website so we can respond to project inquiries. We do not sell personal information.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          To request updates or deletion of submitted information, contact us at
          info@remodelingservicellc.com.
        </p>
      </div>
    </main>
  );
}
