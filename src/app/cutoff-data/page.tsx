
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CutoffDisplay } from '@/components/cutoff-display';
import { getAllStudentRankData } from '@/actions/get-all-student-rank-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, Building } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Shared VIT Cutoff Data',
  description: 'View student-submitted cutoff ranks for various VIT campuses and courses.',
};

// Skeleton component for the table
function CutoffTableSkeleton() {
  const feeCategoryHeaders = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
  const placeholderColleges = ['VIT Vellore', 'VIT Chennai']; 
  const placeholderCourses = ['Loading Course 1...', 'Loading Course 2...', 'Loading Course 3...'];

  return (
    <div className="space-y-8 mt-6">
      {placeholderColleges.map((collegeName) => (
        <Card key={collegeName} className="shadow-lg bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
          <CardHeader className="p-4 pb-3 border-b border-border/40 bg-secondary/50">
            <CardTitle className="text-xl font-bold text-primary flex items-center">
              <Building className="mr-2.5 h-5 w-5 text-primary/50" /> {/* Use actual icon with muted color or Skeleton */}
              <Skeleton className="h-6 w-48" />
            </CardTitle>
            <Skeleton className="h-3 w-3/4 mt-1.5" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-secondary/30 hover:bg-secondary/40">
                    <TableHead className="py-2.5 px-2 sm:px-3 md:px-4 text-xs text-left font-semibold text-primary w-[180px] sm:w-[220px] md:w-[280px] min-w-[160px] sm:min-w-[200px] md:min-w-[240px]">Course Name</TableHead>
                    {feeCategoryHeaders.map((header) => (
                      <TableHead key={header} className="py-2.5 px-1.5 sm:px-2 md:px-3 text-xs text-right font-semibold text-primary min-w-[70px] sm:min-w-[80px] md:min-w-[90px]">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {placeholderCourses.map((courseName) => (
                    <TableRow key={courseName} className="hover:bg-card/90 border-b border-border/20 last:border-b-0">
                      <TableCell className="py-2 px-2 sm:px-3 md:px-4 text-xs font-medium">
                        <Skeleton className="h-4 w-3/4" />
                      </TableCell>
                      {feeCategoryHeaders.map((_, idx) => (
                        <TableCell key={idx} className="py-2 px-1.5 sm:px-2 md:px-3 text-xs text-right">
                           <Skeleton className="h-5 w-10 inline-block" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


async function CutoffDataContent() {
  const { data: cutoffData, success, error, rawCount } = await getAllStudentRankData();

  return (
    <>
      <Alert variant="default" className="mb-6 bg-secondary/60 border-border/40">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <AlertTitle className="font-semibold text-primary">Disclaimer</AlertTitle>
        <AlertDescription className="text-foreground/80">
          The data presented below is submitted by students and is intended for informational purposes only.
          Details are still being gathered, and these ranks may not represent official or final cutoffs.
          Always refer to official VIT sources for definitive admission information.
          Currently displaying data from {rawCount ?? 0} submissions.
        </AlertDescription>
      </Alert>

      {success && cutoffData ? (
        <CutoffDisplay data={cutoffData} />
      ) : (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Loading Data</AlertTitle>
          <AlertDescription>
            {error || 'Could not load cutoff data at this time. Please try again later.'}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}

export default async function CutoffDataPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Student-Shared Cutoff Data
          </h1>
          <Suspense fallback={<CutoffTableSkeleton />}>
            <CutoffDataContent />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
}
