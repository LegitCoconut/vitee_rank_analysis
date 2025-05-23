
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, ArrowRight, Building } from 'lucide-react';

const colleges = [
  { name: 'VIT Vellore', slug: 'vellore' },
  { name: 'VIT Chennai', slug: 'chennai' },
  { name: 'VIT-AP University', slug: 'ap' },
  { name: 'VIT Bhopal University', slug: 'bhopal' },
];

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-12">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            VIT Community Forums
          </h1>
          <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Connect with fellow students, ask questions, and share your experiences.
            Choose a forum below to get started.
          </p>
        </section>

        <section className="space-y-8">
          <Card className="shadow-lg transition-shadow hover:shadow-xl bg-card/80 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary flex items-center">
                <Users className="mr-3 h-7 w-7" />
                Common Discussion Forum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-4">
                A general place for all VIT aspirants and students to discuss topics,
                ask general questions, and share information.
              </p>
              <Link href="/community/common">
                <Button variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Go to Common Forum <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">College-Specific Forums</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {colleges.map((college) => (
                <Card key={college.slug} className="shadow-md transition-shadow hover:shadow-lg bg-card/80 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-primary flex items-center">
                      <Building className="mr-2 h-6 w-6" />
                      {college.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground mb-4">
                      Discussions specific to {college.name}. Ask questions about campus life, courses, and more.
                    </p>
                    <Link href={`/community/${college.slug}`}>
                      <Button variant="outline" size="sm" className="w-full md:w-auto">
                        Go to {college.name} Forum <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
