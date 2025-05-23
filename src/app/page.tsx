
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
