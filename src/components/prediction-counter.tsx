
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react'; // Icon for users/predictions
import { Skeleton } from '@/components/ui/skeleton'; // Skeleton loader
import { getPredictionCount } from '@/actions/get-prediction-count'; // Import the server action

export function PredictionCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCount() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getPredictionCount();
        if (result.success) {
          setCount(result.count ?? 0); // Default to 0 if count is undefined
        } else {
          setError(result.message || 'Failed to load prediction count.');
           setCount(0); // Show 0 on error
        }
      } catch (err) {
        console.error('Error fetching prediction count:', err);
        setError('An error occurred while loading the count.');
        setCount(0); // Show 0 on error
      } finally {
        setIsLoading(false);
      }
    }

    fetchCount();
  }, []); // Fetch count on component mount

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg bg-secondary/60 backdrop-blur-sm border border-border/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-primary">
          Total Predictions Made
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-24" /> // Skeleton loader while fetching
        ) : error ? (
          <p className="text-xs text-destructive">{error}</p> // Show error message
        ) : (
          <div className="text-2xl font-bold text-foreground">
            {count !== null ? count.toLocaleString() : 'N/A'}
          </div>
        )}
        <p className="text-xs text-muted-foreground pt-1">
          Students helped in exploring their options!
        </p>
      </CardContent>
    </Card>
  );
}
