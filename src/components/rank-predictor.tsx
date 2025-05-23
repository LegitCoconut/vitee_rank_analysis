
"use client";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Search, Sparkles, Check, ChevronsUpDown, X } from 'lucide-react'; // Added Check, ChevronsUpDown, X
import { Badge } from '@/components/ui/badge';
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
import { cn } from "@/lib/utils"; // Import cn utility

import type { RankSummaryInput, RankSummaryOutput } from '@/ai/schemas/rank-summary-schemas'; // Updated import path
import { summarizeRank } from '@/ai/flows/rank-summary-flow'; // Import the AI flow
import { incrementPredictionCount } from '@/actions/increment-prediction-count'; // Import the action


// Mock data - replace with actual data/logic
const campusData = [
  {
    name: 'VIT Vellore',
    courses: [
{ name: 'Computer Science and Engineering (CSE)', cutoff: { 1: 950, 2: 3500, 3: 19000, 4: 22000, 5: 25500 } },
      { name: 'CSE (Data Science)', cutoff: { 1: 625, 2: 9000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'CSE (AI and Machine Learning)', cutoff: { 1: 775, 2: 9000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'CSE (Cyber Security)', cutoff: { 1: 775, 2: 9000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'CSE (Information Security)', cutoff: { 1: 1175, 2: 9000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'CSE (Internet of Things)', cutoff: { 1: 1475, 2: 9000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'CSE (Block Chain Technology)', cutoff: { 1: 1575, 2: 9000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'CSE (Bioinformatics)', cutoff: { 1: 675, 2: 9000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'CSE and Business Systems (with TCS)', cutoff: { 1: 1575, 2: 9000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'Information Technology', cutoff: { 1: 675, 2: 9000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'Electronics and Communication Engineering', cutoff: { 1: 7300, 2: 10000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'ECE (Biomedical Engineering)', cutoff: { 1: 6600, 2: 10000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'Electronics Engineering (VLSI Design)', cutoff: { 1: 10200, 2: 15000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'Electrical and Computer Science Engineering', cutoff: { 1: 14950, 2: 19000, 3: 23000, 4: 27000, 5: 31000 } },
      { name: 'Electrical and Electronics Engineering', cutoff: { 1: 19650, 2: 22000, 3: 23000, 4: 26000, 5: 29000 } },
      { name: 'Electronics and Instrumentation Engineering', cutoff: { 1: 24350, 2: 27000, 3: 29000, 4: 32000, 5: 35000 } },
      { name: 'Mechanical Engineering', cutoff: { 1: 40250, 2: 45000, 3: 50000, 4: 55000, 5: 60000 } },
      { name: 'Mechanical Engineering (Electric Vehicles)', cutoff: { 1: 51250, 2: 55000, 3: 60000, 4: 65000, 5: 70000 } },
      { name: 'Mechanical Engineering (Manufacturing)', cutoff: { 1: 74250, 2: 78000, 3: 82000, 4: 86000, 5: 90000 } },
      { name: 'Chemical Engineering', cutoff: { 1: 53250, 2: 57000, 3: 61000, 4: 65000, 5: 70000 } },
      { name: 'Civil Engineering', cutoff: { 1: 54250, 2: 58000, 3: 62000, 4: 66000, 5: 70000 } },
      { name: 'Biotechnology', cutoff: { 1: 14350, 2: 16000, 3: 18000, 4: 20000, 5: 22000 } },
      { name: 'Health Science Technology', cutoff: { 1: 13250, 2: 15000, 3: 17000, 4: 19000, 5: 21000 } },
      { name: 'Production and Industrial Engineering', cutoff: { 1: 50000, 2: 55000, 3: 60000, 4: 65000, 5: 70000 } },
    ],
  },
  {
    name: 'VIT Chennai',
    courses: [
      { name: 'Computer Science and Engineering (CSE)', cutoff: { 1: 5200, 2: 14000, 3: 25000, 4: 29000, 5: 40000 } },
      { name: 'CSE (AI and Machine Learning)', cutoff: { 1: 8500, 2: 20000, 3: 23000, 4: 32000, 5: 44000 } },
      { name: 'CSE (Data Science)', cutoff: { 1: 7000, 2: 18000, 3: 22000, 4: 24000, 5: 43000 } },
      { name: 'CSE (AI and Robotics)', cutoff: { 1: 9000, 2: 21000, 3: 29000, 4: 40000, 5: 425000 } },
      { name: 'CSE (Cyber Security)', cutoff: { 1: 8700, 2: 22000, 3: 26000, 4: 39000, 5: 43000 } },
      { name: 'CSE (Cyber Physical Systems)', cutoff: { 1: 11000, 2: 24000, 3: 31000, 4: 44500, 5: 47000 } },
      { name: 'Electronics and Communication Engineering', cutoff: { 1: 20500, 2: 31000, 3: 44000, 4: 49000, 5: 52000 } },
      { name: 'Electrical and Electronics Engineering', cutoff: { 1: 45000, 2: 55000, 3: 69000, 4: 79000, 5: 81000 } },
      { name: 'Electrical and Computer Science', cutoff: { 1: 18000, 2: 26000, 3: 38000, 4: 44000, 5: 48000 } },
      { name: 'Electronics (VLSI Design)', cutoff: { 1: 33000, 2: 38000, 3: 44000, 4: 46000, 5: 50000 } },
      { name: 'Electronics and Computer Science', cutoff: { 1: 9000, 2: 19000, 3: 33000, 4: 44000, 5: 46000 } },
      { name: 'Mechanical Engineering', cutoff: { 1: 65000, 2: 78000, 3: 82000, 4: 90000, 5: 94000 } },
      { name: 'Mechanical Engineering (Electric Vehicles)', cutoff: { 1: 73000, 2: 88000, 3: 94000, 4: 96000, 5: 98000 } },
      { name: 'Mechatronics & Automation Engineering', cutoff: { 1: 77000, 2: 85000, 3: 90000, 4: 93000, 5: 95000 } },
      { name: 'Fashion Technology' , cutoff: { 1: 82000, 2: 84000, 3: 91000, 4:94000, 5: 96000 } },
      { name: 'Civil Engineering', cutoff: { 1: 84000, 2: 87000, 3: 91000, 4: 95000, 5: 98000 } },
    ],
  },
  {
    name: 'VIT-AP University',
    courses: [
      { name: 'Computer Science and Engineering (CSE)', cutoff: { 1: 28000, 2: 38000, 3: 48000, 4: 58000, 5: 68000 } },
      { name: 'Electronics and Communication Engineering (ECE)', cutoff: { 1: 40000, 2: 50000, 3: 60000, 4: 70000, 5: 80000 } },
      { name: 'Mechanical Engineering', cutoff: { 1: 50000, 2: 60000, 3: 70000, 4: 80000, 5: 90000 } },
      { name: 'Software Engineering', cutoff: { 1: 35000, 2: 45000, 3: 55000, 4: 65000, 5: 75000 } },
      { name: 'CSE (Data Science)', cutoff: { 1: 32000, 2: 42000, 3: 52000, 4: 62000, 5: 72000 } },
      { name: 'Electronics and VLSI Engineering', cutoff: { 1: 42000, 2: 52000, 3: 62000, 4: 72000, 5: 82000 } },
      { name: 'BBA (Business Analytics)', cutoff: { 1: 60000, 2: 70000, 3: 80000, 4: 90000, 5: 100000 } }, // Example non-engg cutoff
    ],
  },
  {
    name: 'VIT Bhopal University',
    courses: [
      { name: 'Computer Science and Engineering (CSE)', cutoff: { 1: 35000, 2: 45000, 3: 55000, 4: 65000, 5: 75000 } },
      { name: 'Aerospace Engineering', cutoff: { 1: 55000, 2: 65000, 3: 75000, 4: 85000, 5: 95000 } },
      { name: 'Bioengineering', cutoff: { 1: 60000, 2: 70000, 3: 80000, 4: 90000, 5: 100000 } },
      { name: 'Gaming Technology', cutoff: { 1: 45000, 2: 55000, 3: 65000, 4: 75000, 5: 85000 } },
      { name: 'CSE (AI & Machine Learning)', cutoff: { 1: 38000, 2: 48000, 3: 58000, 4: 68000, 5: 78000 } },
      { name: 'CSE (Cyber Security & Digital Forensics)', cutoff: { 1: 40000, 2: 50000, 3: 60000, 4: 70000, 5: 80000 } },
       { name: 'Robotics and Automation', cutoff: { 1: 58000, 2: 68000, 3: 78000, 4: 88000, 5: 98000 } },
    ],
  },
];
const campusNames = campusData.map(campus => campus.name);
const allCourses = [...new Set(campusData.flatMap(campus => campus.courses.map(course => course.name)))].sort();
const feeCategoryOptions = ["Any", "1", "2", "3", "4", "5"]; // Define fee categories including "Any"

// Updated Schema for multi-select preferences
const FormSchema = z.object({
  rank: z.coerce
    .number({ invalid_type_error: 'Rank must be a number' })
    .int()
    .positive('Rank must be a positive number')
    .max(150000, 'Rank seems too high, please verify.'),
  campusPreferences: z.array(z.string()).min(1, 'Select at least one campus or "Any Campus"'),
  coursePreferences: z.array(z.string()).min(1, 'Select at least one course or "Any Course"'),
  feeCategory: z.string().refine((val) => feeCategoryOptions.includes(val), { // Validate fee category
    message: "Please select a valid fee category",
  }),
});

interface PredictionResult {
  campus: string;
  course: string;
  category: number; // Fee category where the rank might fall
  cutoff: number; // Cutoff for that specific category
}

export function RankPredictor() {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null); // State for AI summary
  const [isAiLoading, setIsAiLoading] = useState(false); // State for AI loading

  const [campusPopoverOpen, setCampusPopoverOpen] = useState(false);
  const [coursePopoverOpen, setCoursePopoverOpen] = useState(false);


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rank: undefined,
      campusPreferences: ["Any"], // Default to "Any"
      coursePreferences: ["Any"], // Default to "Any"
      feeCategory: "Any", // Default to Any Category
    },
  });

  // Helper function to handle removing an item from selection
  const handleRemoveSelection = (
    field: any, // Consider using ControllerRenderProps type if possible
    itemToRemove: string,
    allOptions: string[],
    defaultOption: string = "Any"
  ) => {
    const currentSelection = field.value || [];
    const newSelection = currentSelection.filter((item: string) => item !== itemToRemove);

    // If removing the item results in an empty selection, revert to defaultOption
    if (newSelection.length === 0) {
        field.onChange([defaultOption]);
    } else {
        field.onChange(newSelection);
    }
  };


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setError(null);
    setPredictions([]);
    setAiSummary(null); // Reset AI summary
    setIsAiLoading(false); // Reset AI loading state

    const { rank, campusPreferences, coursePreferences, feeCategory } = data;

    // Determine the maximum category to check based on user selection
    const targetCategoryNum = feeCategory === "Any" ? 5 : parseInt(feeCategory, 10);

    // Simulate API call or complex logic
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const possibleCourses: PredictionResult[] = [];

      campusData.forEach((campus) => {
        // Filter by campus preference if not 'Any'
        const campusIsSelected = campusPreferences.includes("Any") || campusPreferences.includes(campus.name);
        if (!campusIsSelected) {
          return;
        }

        campus.courses.forEach((course) => {
           // Filter by course preference if not 'Any'
           const courseIsSelected = coursePreferences.includes("Any") || coursePreferences.includes(course.name);
           if (!courseIsSelected) {
             return;
           }

          // Check if rank falls within the desired fee category or better (lower category number)
          // or within *any* category if "Any" is selected.
          for (let category = 1; category <= targetCategoryNum; category++) {
            const cutoffForCategory = course.cutoff[category as keyof typeof course.cutoff];
            // Add a small buffer (e.g., 15%) to account for year-to-year variations
            const cutoffWithBuffer = cutoffForCategory * 1.15;

             if (rank <= cutoffWithBuffer) {
              possibleCourses.push({
                campus: campus.name,
                course: course.name,
                category: category,
                cutoff: cutoffForCategory,
              });
               break; // Found the best possible category for this course, move to next course
            }
          }
        });
      });

       // Sort predictions: Prioritize lower category, then lower cutoff within category
      possibleCourses.sort((a, b) => {
        if (a.category !== b.category) {
          return a.category - b.category;
        }
        return a.cutoff - b.cutoff;
      });


      if (possibleCourses.length === 0) {
          let errorMsg = `Based on the rank ${rank}`;
          if (feeCategory === "Any") {
            errorMsg += `, no likely options were found in any fee category using estimated historical data. This rank might be too high for admission based on these estimates.`;
          } else {
            errorMsg += ` and targeting Category ${targetCategoryNum} or better, no likely options were found using estimated historical data. Consider checking higher fee categories or broadening preferences.`;
          }
          errorMsg += ` Cutoffs change annually.`;
          setError(errorMsg);
      } else {
        setPredictions(possibleCourses);
        // Trigger AI summary generation, passing the *target* category for context
        const targetCatForAISummary = feeCategory === "Any" ? 5 : parseInt(feeCategory, 10);
        generateAiSummary(rank, targetCatForAISummary, possibleCourses);
        // Increment prediction count - fire and forget for now
        incrementPredictionCount().catch(err => console.error("Failed to increment prediction count:", err));

      }
    } catch (err) {
        setError('An error occurred while predicting. Please try again.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  }

  // Function to generate AI summary
  async function generateAiSummary(rank: number, category: number, results: PredictionResult[]) {
    setIsAiLoading(true);
    setAiSummary(null); // Clear previous summary
    try {
        const aiInput: RankSummaryInput = {
          rank: rank,
          category: category, // Use the *target* category passed to the function
          results: results.map(r => ({
            campus: r.campus,
            course: r.course,
            category: r.category,
            cutoff: r.cutoff
          }))
        };

        const summaryOutput: RankSummaryOutput = await summarizeRank(aiInput);
        setAiSummary(summaryOutput.summary);


    } catch (error) {
        // Log the specific error to the console for debugging
        console.error("AI summary generation failed:", error);
        // Set a user-friendly error message
        setAiSummary("Could not generate AI summary at this time.");
    } finally {
        setIsAiLoading(false);
    }
 }


  return (
    <Card className="shadow-lg transition-shadow hover:shadow-xl bg-card/80 backdrop-blur-sm border border-border/50"> {/* Adjusted card style */}
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Predict Your Options</CardTitle>
            <CardDescription>Enter your VITEEE rank and preferences to see potential campus and course matches based on estimated cutoffs. With new and improved Data set.</CardDescription> {/* Updated description */}
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end"> {/* Use grid for better layout */}
                <FormField
                  control={form.control}
                  name="rank"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-1"> {/* Adjust span */}
                      <FormLabel>Your VITEEE Rank</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 15000" {...field} className="bg-background/70 backdrop-blur-sm" /></FormControl>
                      <FormMessage />

                    </FormItem>

                  )}
                />

               {/* Campus Preferences Multi-Select */}
               <FormField
                  control={form.control}
                  name="campusPreferences"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-1 flex flex-col">
                      <FormLabel>Campus Preference</FormLabel>
                      <Popover open={campusPopoverOpen} onOpenChange={setCampusPopoverOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={campusPopoverOpen}
                              className={cn(
                                "w-full justify-between bg-background/70 backdrop-blur-sm h-auto min-h-10 py-2", // Adjusted height and padding
                                (!field.value || field.value.length === 0 || field.value.includes("Any")) && "text-muted-foreground"
                              )}
                            >
                             <div className="flex flex-wrap gap-1 items-center">
                                {field.value?.includes("Any") || field.value.length === 0 ? (
                                  <span className="text-sm">Any Campus</span>
                                ) : (
                                  field.value?.map((campus) => (
                                    <Badge
                                      key={campus}
                                      variant="secondary"
                                      className="rounded-sm px-2 py-0.5 text-xs flex items-center gap-1"
                                    >
                                      {campus}
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-destructive"
                                        onClick={(e) => {
                                          e.stopPropagation(); // Prevent popover from opening
                                          handleRemoveSelection(field, campus, campusNames, "Any");
                                        }}
                                      >
                                        <X className="h-3 w-3" />
                                        <span className="sr-only">Remove {campus}</span>
                                      </Button>
                                    </Badge>
                                  ))
                                )}
                              </div>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                         <Command>
                          <CommandInput placeholder="Search campus..." />
                           <CommandList>
                              <CommandEmpty>No campus found.</CommandEmpty>
                              <CommandGroup>
                                <CommandItem
                                    key="Any"
                                    value="Any"
                                    onSelect={() => {
                                        field.onChange(["Any"]); // Select only "Any"
                                        // setCampusPopoverOpen(false); // Keep open if needed for better UX
                                    }}
                                >
                                    <Checkbox
                                        checked={field.value?.includes("Any")}
                                        className="mr-2"
                                    />
                                    Any Campus
                                </CommandItem>
                                {campusNames.map((campus) => (
                                  <CommandItem
                                    key={campus}
                                    value={campus}
                                    onSelect={() => {
                                        const currentSelection = field.value || [];
                                        // Remove "Any" if it exists when selecting a specific campus
                                        const selectionWithoutAny = currentSelection.filter(c => c !== "Any");
                                        const isSelected = selectionWithoutAny.includes(campus);
                                        let newSelection;

                                        if (isSelected) {
                                            newSelection = selectionWithoutAny.filter(c => c !== campus);
                                        } else {
                                            newSelection = [...selectionWithoutAny, campus];
                                        }

                                        // If nothing is selected, default back to "Any"
                                        field.onChange(newSelection.length === 0 ? ["Any"] : newSelection);
                                        // setCampusPopoverOpen(false); // Keep open if needed
                                    }}
                                  >
                                    <Checkbox
                                      checked={!field.value?.includes("Any") && field.value?.includes(campus)} // Only checked if not "Any" and this campus is selected
                                      className="mr-2"
                                    />
                                    {campus}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                           </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Course Preferences Multi-Select */}
                <FormField
                  control={form.control}
                  name="coursePreferences"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-1 flex flex-col">
                      <FormLabel>Course Preference</FormLabel>
                       <Popover open={coursePopoverOpen} onOpenChange={setCoursePopoverOpen}>
                        <PopoverTrigger asChild>
                           <FormControl>
                             <Button
                               variant="outline"
                               role="combobox"
                               aria-expanded={coursePopoverOpen}
                               className={cn(
                                "w-full justify-between bg-background/70 backdrop-blur-sm h-auto min-h-10 py-2", // Adjusted height and padding
                                (!field.value || field.value.length === 0 || field.value.includes("Any")) && "text-muted-foreground"
                               )}
                             >
                                <div className="flex flex-wrap gap-1 items-center">
                                  {field.value?.includes("Any") || field.value.length === 0 ? (
                                    <span className="text-sm">Any Course</span>
                                  ) : (
                                    field.value?.map((course) => (
                                      <Badge
                                        key={course}
                                        variant="secondary"
                                        className="rounded-sm px-2 py-0.5 text-xs flex items-center gap-1"
                                      >
                                        <span className="truncate max-w-[150px]">{course}</span>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-destructive flex-shrink-0"
                                          onClick={(e) => {
                                            e.stopPropagation(); // Prevent popover from opening
                                            handleRemoveSelection(field, course, allCourses, "Any");
                                          }}
                                        >
                                          <X className="h-3 w-3" />
                                          <span className="sr-only">Remove {course}</span>
                                        </Button>
                                      </Badge>
                                    ))
                                  )}
                                </div>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search course..." />
                            <CommandList>
                              <CommandEmpty>No course found.</CommandEmpty>
                              <CommandGroup>
                                <CommandItem
                                    key="Any"
                                    value="Any"
                                    onSelect={() => {
                                        field.onChange(["Any"]);
                                        // setCoursePopoverOpen(false);
                                    }}
                                >
                                    <Checkbox
                                        checked={field.value?.includes("Any")}
                                        className="mr-2"
                                    />
                                    Any Course
                                </CommandItem>
                                {allCourses.map((course) => (
                                  <CommandItem
                                    key={course}
                                    value={course}
                                     onSelect={() => {
                                        const currentSelection = field.value || [];
                                        const selectionWithoutAny = currentSelection.filter(c => c !== "Any");
                                        const isSelected = selectionWithoutAny.includes(course);
                                        let newSelection;

                                        if (isSelected) {
                                            newSelection = selectionWithoutAny.filter(c => c !== course);
                                        } else {
                                            newSelection = [...selectionWithoutAny, course];
                                        }
                                         field.onChange(newSelection.length === 0 ? ["Any"] : newSelection);
                                        // setCoursePopoverOpen(false);
                                    }}
                                  >
                                    <Checkbox
                                      checked={!field.value?.includes("Any") && field.value?.includes(course)}
                                      className="mr-2"
                                    />
                                    {course}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                             </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                  </FormItem>
                  )}
                />


                 <FormField
                    control={form.control}
                    name="feeCategory" // Updated field name
                    render={({ field }) => (
                        <FormItem className="lg:col-span-1">
                            <FormLabel>Target Fee Category</FormLabel> {/* Updated label */}
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="bg-background/70 backdrop-blur-sm">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-background/80 backdrop-blur-sm">
                                    {feeCategoryOptions.map((category) => ( // Use feeCategoryOptions
                                        <SelectItem key={category} value={category}>
                                            {category === "Any" ? "Any Category" : `Category ${category}`} {/* Display text */}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} className="w-full lg:col-span-1"> {/* Removed custom bg-accent classes */}
                  {isLoading ? (
                    <span className="flex items-center justify-center"> {/* Center loading state */}
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Predicting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center"> {/* Center default state */}
                      <Search className="mr-2 h-4 w-4" />
                      Predict Options
                    </span>
                  )}
                </Button>
              </form>
            </Form>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Prediction Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

             {/* AI Summary Section */}
             {(isAiLoading || aiSummary) && (
                <div className="mt-6 space-y-2">
                    <h3 className="text-lg font-semibold text-primary flex items-center">
                        <Sparkles className="mr-2 h-5 w-5 text-accent" />
                        AI Insights
                    </h3>
                    <Card className="bg-secondary/50 border border-border/30 p-4">
                        {isAiLoading ? (
                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Generating AI summary...</span>
                            </div>
                        ) : (
                            <p className="text-sm text-foreground">{aiSummary}</p>
                        )}
                    </Card>
                </div>
             )}

            {predictions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">Predicted Options (Sorted by Category & Difficulty)</h3>
                <Alert className="mb-4 bg-primary/10 border-primary/30 text-primary-foreground/80">
                  <AlertDescription>
                    These predictions indicate the *best possible* fee category (1-5) your rank might achieve for each course, based on estimated cutoffs. Lower category numbers generally mean lower fees but higher rank requirements. Actual admission depends on official counselling.
                  </AlertDescription>
                </Alert>
                <ScrollArea className="h-72 w-full rounded-md border border-border/50 p-4 bg-background/70 backdrop-blur-sm"> {/* Increased height and added transparency */}
                  <ul className="space-y-2">
                    {predictions.map((prediction, index) => (
                      <li key={index} className="text-sm p-3 rounded bg-secondary/60 backdrop-blur-sm flex justify-between items-center gap-2"> {/* Added gap */}
                        <div className="flex-1 min-w-0"> {/* Ensure text wraps */}
                            <span className="font-medium text-primary mr-2">{prediction.campus}:</span>
                            <span className="text-foreground break-words">{prediction.course}</span> {/* Allow wrapping */}
                        </div>
                         <Badge variant="outline" className="text-xs whitespace-nowrap">Fee Cat: {prediction.category}</Badge> {/* Show predicted category */}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            )}

            {/* Loading state shown only when loading AND no predictions or errors yet */}
            {isLoading && predictions.length === 0 && !error && (
                <div className="mt-6 flex justify-center items-center h-60 w-full rounded-md border border-border/50 p-4 bg-background/70 backdrop-blur-sm">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">Calculating predictions...</span>
                </div>
            )}

            {/* "No results" state shown only when NOT loading, no predictions, no error (meaning calculation finished but found nothing) */}
            {!isLoading && predictions.length === 0 && !error && form.formState.isSubmitSuccessful && (
                <div className="mt-6 flex justify-center items-center h-60 w-full rounded-md border border-border/50 p-4 bg-background/70 backdrop-blur-sm text-center">
                     <span className="text-muted-foreground">
                        No likely options found for rank {form.getValues("rank")}
                        {form.getValues("feeCategory") === "Any" ? " in any category" : ` targeting Category ${form.getValues("feeCategory")} or better`} based on estimates. Try adjusting preferences or category.
                     </span>
                </div>
            )}
           {/* Initial state message before any submission */}
             {!isLoading && predictions.length === 0 && !error && !form.formState.isSubmitSuccessful && (
                <div className="mt-6 flex justify-center items-center h-60 w-full rounded-md border border-border/50 p-4 bg-background/70 backdrop-blur-sm text-center">
                    <span className="text-muted-foreground">Enter your rank and preferences above to see predictions.</span>
                </div>
            )}

          </CardContent>
        </Card>
  );
}
