
'use client';

import { useEffect, useState, useRef } from 'react';
import { getTestimonials, type TestimonialDocument } from '@/actions/get-testimonials';
import { TestimonialCard } from './testimonial-card';
import { Loader2, MessageSquareQuote } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activateMarquee, setActivateMarquee] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getTestimonials();
        if (result.success && result.testimonials) {
          setTestimonials(result.testimonials);
        } else {
          setError(result.error || 'Failed to load testimonials.');
          setTestimonials([]);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('An unexpected error occurred while loading testimonials.');
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current && contentWrapperRef.current && testimonials.length > 0) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        // Get the width of the original set of items (contentWrapperRef contains duplicated items if marquee is active)
        const singleSetWidth = activateMarquee ? contentWrapperRef.current.scrollWidth / 2 : contentWrapperRef.current.scrollWidth;

        if (singleSetWidth > containerWidth) {
          // Activate marquee if it's not already active and content overflows
          if (!activateMarquee) setActivateMarquee(true);
        } else {
          // Deactivate marquee if content does not overflow
          if (activateMarquee) setActivateMarquee(false);
        }
      } else {
         // Deactivate marquee if there are no testimonials or refs aren't available
        if (activateMarquee) setActivateMarquee(false);
      }
    };

    if (!isLoading) {
      checkOverflow();
    }

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [isLoading, testimonials, activateMarquee]);

  if (isLoading) {
    return (
      <section className="py-12 space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary flex items-center justify-center">
          <MessageSquareQuote className="mr-3 h-8 w-8" /> Hear from Our Users
        </h2>
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (error || (!isLoading && testimonials.length === 0)) {
    console.log(error ? `Testimonial section error: ${error}` : 'No testimonials to display.');
    return null;
  }

  return (
    <section className="py-12 space-y-8">
      <h2 className="text-3xl font-bold text-center text-primary flex items-center justify-center">
        <MessageSquareQuote className="mr-3 h-8 w-8" /> Hear from Our Users
      </h2>
      <div
        ref={scrollContainerRef}
        className="testimonial-scroll-container w-full" // Removed conditional overflow-x-auto
      >
        <div
          ref={contentWrapperRef}
          className={cn(
            "testimonial-scroll-content flex w-max space-x-6 p-4",
            activateMarquee && "marquee-active"
          )}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial._id?.toString() + '-original'}
              name={testimonial.name}
              message={testimonial.message}
            />
          ))}
          {activateMarquee && testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial._id?.toString() + '-duplicate'}
              name={testimonial.name}
              message={testimonial.message}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
