
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Forum } from '@/components/forum';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const validForums = ['common', 'vellore', 'chennai', 'ap', 'bhopal'];
const forumNames: { [key: string]: string } = {
  common: 'Common Discussion Forum',
  vellore: 'VIT Vellore Forum',
  chennai: 'VIT Chennai Forum',
  ap: 'VIT-AP University Forum',
  bhopal: 'VIT Bhopal University Forum',
};


export default function ForumPage({ params }: { params: { forumSlug: string } }) {
  const { forumSlug } = params;

  if (!validForums.includes(forumSlug)) {
    notFound();
  }

  const forumName = forumNames[forumSlug] || 'Community Forum';


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-8">
        <section>
          <div className="mb-6">
            <Link href="/community">
              <Button variant="outline" className="text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Forums
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            {forumName}
          </h1>
          <Forum forumId={forumSlug} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return validForums.map((slug) => ({
    forumSlug: slug,
  }));
}
