
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitStudentRankData } from '@/actions/submit-rank-data'; // New server action
import type { StudentRankDataInput } from '@/actions/submit-rank-data'; // Type for action input

const campusData = [
  {
    name: 'VIT Vellore',
    courses: [
      'Computer Science and Engineering (CSE)',
      'CSE (Data Science)',
      'CSE (AI and Machine Learning)',
      'CSE (Cyber Security)',
      'CSE (Information Security)',
      'CSE (Internet of Things)',
      'CSE (Block Chain Technology)',
      'CSE (Bioinformatics)',
      'CSE and Business Systems (with TCS)',
      'Information Technology',
      'Electronics and Communication Engineering',
      'ECE (Biomedical Engineering)',
      'Electronics Engineering (VLSI Design)',
      'Electrical and Computer Science Engineering',
      'Electrical and Electronics Engineering',
      'Electronics and Instrumentation Engineering',
      'Mechanical Engineering',
      'Mechanical Engineering (Electric Vehicles)',
      'Mechanical Engineering (Manufacturing)',
      'Chemical Engineering',
      'Civil Engineering',
      'Biotechnology',
      'Health Science Technology',
      'Production and Industrial Engineering'
    ]
  },
  {
    name: 'VIT Chennai',
    courses: [
      'Computer Science and Engineering (CSE)',
      'CSE (AI and Machine Learning)',
      'CSE (Data Science)',
      'CSE (AI and Robotics)',
      'CSE (Cyber Security)',
      'CSE (Cyber Physical Systems)',
      'Electronics and Communication Engineering',
      'Electrical and Electronics Engineering',
      'Electrical and Computer Science',
      'Electronics (VLSI Design)',
      'Electronics and Computer Science',
      'Mechanical Engineering',
      'Mechanical Engineering (Electric Vehicles)',
      'Mechatronics & Automation Engineering',
      'Fashion Technology',
      'Civil Engineering'
    ]
  },
  {
    name: 'VIT-AP University',
    courses: [
      'Computer Science and Engineering (CSE)',
      'Electronics and Communication Engineering (ECE)',
      'Mechanical Engineering',
      'Software Engineering',
      'CSE (Data Science)',
      'Electronics and VLSI Engineering',
      'BBA (Business Analytics)'
    ]
  },
  {
    name: 'VIT Bhopal University',
    courses: [
      'Computer Science and Engineering (CSE)',
      'Aerospace Engineering',
      'Bioengineering',
      'Gaming Technology',
      'CSE (AI & Machine Learning)',
      'CSE (Cyber Security & Digital Forensics)',
      'Robotics and Automation'
    ]
  },
];

const allCourses = [...new Set(campusData.flatMap(campus => campus.courses.map(course => course)))].sort();
const campusNames = campusData.map(campus => campus.name);
const feeCategories = ["1", "2", "3", "4", "5"];

const DataSubmissionSchema = z.object({
  rank: z.coerce
    .number({ invalid_type_error: 'Rank must be a number', required_error: 'Rank is required.' })
    .int('Rank must be an integer.')
    .positive('Rank must be a positive number.')
    .min(1, 'Rank must be at least 1.')
    .max(150000, 'Rank seems too high, please verify.'),
  college: z.string({ required_error: 'College is required.' }).min(1, 'Please select a college.'),
  course: z.string({ required_error: 'Course is required.' }).min(1, 'Please select a course.'),
  category: z.string({ required_error: 'Fee category is required.' }).min(1, 'Please select a fee category.'),
});

export function DataSubmissionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof DataSubmissionSchema>>({
    resolver: zodResolver(DataSubmissionSchema),
    defaultValues: {
      rank: undefined,
      college: '',
      course: '',
      category: '',
    },
  });

  async function onSubmit(data: z.infer<typeof DataSubmissionSchema>) {
    setIsLoading(true);
    try {
      const submissionData: StudentRankDataInput = {
        rank: data.rank,
        college: data.college,
        course: data.course,
        category: parseInt(data.category, 10), // Convert category to number
      };
      const result = await submitStudentRankData(submissionData);

      if (result.success) {
        toast({
          title: 'Data Submitted!',
          description: 'Thank you for contributing to our dataset.',
        });
        form.reset();
      } else {
        toast({
          title: 'Error Submitting Data',
          description: result.error || 'An unexpected error occurred. Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Data submission error:', error);
      toast({
        title: 'Submission Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const selectedCollege = form.watch('college');
  const availableCourses = campusData.find(c => c.name === selectedCollege)?.courses || allCourses;


  return (
    <Card className="shadow-lg transition-shadow hover:shadow-xl bg-card/80 backdrop-blur-sm border border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Submit Your Rank Details</CardTitle>
        <CardDescription>Your information helps us provide more accurate predictions for everyone.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your VITEEE Rank</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 15000" {...field} className="bg-background/70 backdrop-blur-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Admitted To</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('course', ''); // Reset course when college changes
                  }} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/70 backdrop-blur-sm">
                        <SelectValue placeholder="Select College" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background/80 backdrop-blur-sm">
                      {campusNames.map((campus) => (
                        <SelectItem key={campus} value={campus}>
                          {campus}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Admitted To</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} disabled={!selectedCollege}>
                    <FormControl>
                      <SelectTrigger className="bg-background/70 backdrop-blur-sm">
                        <SelectValue placeholder={selectedCollege ? "Select Course" : "Select College First"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background/80 backdrop-blur-sm max-h-60 overflow-y-auto">
                      {availableCourses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/70 backdrop-blur-sm">
                        <SelectValue placeholder="Select Fee Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background/80 backdrop-blur-sm">
                      {feeCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          Category {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Data
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
