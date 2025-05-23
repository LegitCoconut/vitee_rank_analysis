
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRightCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getStudentDataCount } from '@/actions/get-student-data-count';

export function StudentDataCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCount() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getStudentDataCount();
        if (result.success) {
          setCount(result.count ?? 0);
        } else {
          setError(result.message || 'Failed to load student data count.');
           setCount(0);
        }
      } catch (err) {
        console.error('Error fetching student data count:', err);
        setError('An error occurred while loading the count.');
        setCount(0);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCount();
  }, []);

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg bg-secondary/60 backdrop-blur-sm border border-border/40 flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-primary">
          Cutoff Data Shared
        </CardTitle>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
          {isLoading ? (
            <Skeleton className="h-8 w-24 mb-1" />
          ) : error ? (
            <p className="text-xs text-destructive">{error}</p>
          ) : (
            <div className="text-2xl font-bold text-foreground">
              {count !== null ? count.toLocaleString() : 'N/A'}
            </div>
          )}
          <p className="text-xs text-muted-foreground pt-1">
            Students improving predictions by sharing their admission outcomes.
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="mt-4 w-full">
          <Link href="/cutoff-data">
            Click here to view cutoff data
            <ArrowRightCircle className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
