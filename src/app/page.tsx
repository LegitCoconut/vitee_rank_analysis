
import { RankPredictor } from '@/components/rank-predictor';
import { CampusInfo } from '@/components/campus-info';
import { CourseList } from '@/components/course-list';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { FeedbackForm } from '@/components/feedback-form';
import { PredictionCounter } from '@/components/prediction-counter';
import { FeedbackCounter } from '@/components/feedback-counter';
import { StudentDataCounter } from '@/components/student-data-counter';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { TestimonialsSection } from '@/components/testimonials-section'; 

export const metadata = {
  title: 'Free VITEEE Rank Analysis Tool | VITEERanks',
  description:
    'Get your VITEEE rank analysis instantly and for free. Predict your admission chances at VIT campuses including VIT Vellore, Chennai, Bhopal, and AP. Explore placement stats, AI-based college prediction, and more.',
  keywords: [
    'VITEEE',
    'VITEEE 2025',
    'VITEEE rank analysis',
    'VITEEE college predictor',
    'VITEEE rank predictor',
    'VITEEE free tool',
    'VIT admission',
    'VITEEE AI analysis',
    'VITEEE placements',
    'VIT campus comparison',
    'VITEEE vs JEE',
    'VITEEE expected rank',
    'VITEEE score vs rank',
    'VIT counselling 2025',
    'VITEEE seat predictor',
    'VIT branch selection',
    'VITEEE cutoff 2024',
    'VITEEE category rank',
    'VIT vellore placement stats',
    'VITEEE admission chances',
  ],
  other: {
    'google-site-verification': '1un__YAfOUDSv7-dtHBNXq1sbPUzZUMqTRd2PHwZZ_c', 
  },
  metadataBase: new URL('https://viteeeranks.vercel.app'),
  openGraph: {
    title: 'VITEEE Rank Predictor & Admission Analysis Tool',
    description:
      'Use our free and accurate VITEEE rank predictor to estimate your rank and admission chances. Includes AI-powered tools, campus-wise analysis, and real student feedback.',
    url: 'https://viteeeranks.vercel.app',
    siteName: 'VITEERanks',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-12">
        <Hero />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <PredictionCounter />
            <FeedbackCounter />
            <StudentDataCounter /> {/* This card now contains a link/button */}
            <Link href="/community" className="col-span-1">
              <Card className="shadow-md transition-shadow hover:shadow-lg bg-secondary/60 backdrop-blur-sm border border-border/40 h-full flex flex-col justify-between cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-primary">
                    Join the Community
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-2xl font-bold text-foreground">
                    Connect & Discuss
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">
                    Ask doubts, share insights, and connect with fellow aspirants and students.
                  </p>
                </CardContent>
              </Card>
            </Link>
        </div>
        <CampusInfo />
        <section id="rank-predictor-section" className="scroll-mt-20">
            <RankPredictor />
        </section>
        <CourseList />
        <TestimonialsSection /> 
        <FeedbackForm />
      </main>
      <Footer />
    </div>
  );
}
