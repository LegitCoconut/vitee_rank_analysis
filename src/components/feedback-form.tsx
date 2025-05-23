
'use client';

import * as React from 'react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
 } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendFeedback } from '@/actions/send-feedback'; // Import the server action

// Define Zod schema for form validation
const FeedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.').optional().or(z.literal('')), // Optional email
  message: z.string().min(10, 'Feedback message must be at least 10 characters.').max(500, 'Feedback message must be at most 500 characters.'),
});

export function FeedbackForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FeedbackSchema>) {
    setIsLoading(true);
    try {
      // Call the server action
      const result = await sendFeedback(data);

      if (result.success) {
        toast({
          title: 'Feedback Sent!',
          description: 'Thank you for your feedback.',
        });
        form.reset(); // Reset form on success
      } else {
        toast({
          title: 'Error Sending Feedback',
          description: result.message || 'An unexpected error occurred. Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast({
        title: 'Submission Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="space-y-6">
       <Card className="shadow-lg transition-shadow hover:shadow-xl bg-card/80 backdrop-blur-sm border border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Share Your Feedback</CardTitle>
            <CardDescription>Help us improve! Let us know what you think.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} className="bg-background/70 backdrop-blur-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                   <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (Optional)</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} className="bg-background/70 backdrop-blur-sm" />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>
                 <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feedback</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us what you think..."
                            className="resize-none bg-background/70 backdrop-blur-sm"
                            {...field}
                          />
                        </FormControl>
                         <FormMessage />
                      </FormItem>
                    )}
                  />
                <Button type="submit" disabled={isLoading} className="w-full md:w-auto"> {/* Removed custom bg-accent classes */}
                   {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                     <>
                      <Send className="mr-2 h-4 w-4" />
                       Send Feedback
                     </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
       </Card>
    </section>
  );
}
