
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { DataSubmissionForm } from '@/components/data-submission-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Share Your VIT Rank Data',
  description: 'Help us improve our predictions by sharing your VITEEE rank, campus, course, and fee category.',
};

export default function SubmitDataPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-8">
        <section>
          <div className="mb-6">
            <Link href="/">
              <Button variant="outline" className="text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Share Your VIT Rank Data
          </h1>
          <p className="text-muted-foreground mb-6">
            Help fellow aspirants by providing your admission details. This data helps us refine our rank predictor.
          </p>
          <DataSubmissionForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
