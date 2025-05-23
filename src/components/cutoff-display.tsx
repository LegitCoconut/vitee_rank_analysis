
'use client';

import type { ProcessedCutoffData } from '@/actions/get-all-student-rank-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building } from 'lucide-react';

interface CutoffDisplayProps {
  data: ProcessedCutoffData;
}

const feeCategoryHeaders = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
const feeCategoryKeys = [1, 2, 3, 4, 5]; // For accessing data

// Define the desired order for colleges
const collegeOrder = [
  'VIT Vellore',
  'VIT Chennai',
  'VIT-AP University',
  'VIT Bhopal University',
];

export function CutoffDisplay({ data }: CutoffDisplayProps) {
  // Get the colleges present in the data
  const availableColleges = Object.keys(data);

  // Sort the available colleges based on the predefined order
  const colleges = availableColleges.sort((a, b) => {
    const indexA = collegeOrder.indexOf(a);
    const indexB = collegeOrder.indexOf(b);

    // If both colleges are in the predefined order, sort by their index
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    // If only A is in the order, it comes first
    if (indexA !== -1) {
      return -1;
    }
    // If only B is in the order, it comes first
    if (indexB !== -1) {
      return 1;
    }
    // If neither is in the order, sort alphabetically (fallback)
    return a.localeCompare(b);
  });

  if (colleges.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No cutoff data has been shared yet. Be the first to contribute!</p>;
  }

  return (
    <div className="space-y-8">
      {colleges.map((collegeName) => (
        <Card key={collegeName} className="shadow-lg transition-shadow hover:shadow-xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden">
          <CardHeader className="p-4 pb-3 border-b border-border/40 bg-secondary/50">
            <CardTitle className="text-xl font-bold text-primary flex items-center">
              <Building className="mr-2.5 h-5 w-5" />
              {collegeName}
            </CardTitle>
            <CardDescription className="text-xs pt-0.5 text-muted-foreground">Student-submitted highest ranks per course and fee category.</CardDescription>
          </CardHeader>
          <CardContent className="p-0"> {/* Remove padding to let table use full width */}
            {Object.keys(data[collegeName]).length === 0 ? (
              <p className="text-muted-foreground text-sm text-center p-6">No data submitted for this college yet.</p>
            ) : (
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
                    {Object.entries(data[collegeName])
                      .sort(([courseA], [courseB]) => courseA.localeCompare(courseB)) // Sort courses alphabetically
                      .map(([courseName, categoriesData]) => (
                      <TableRow key={courseName} className="hover:bg-card/90 border-b border-border/20 last:border-b-0">
                        <TableCell className="py-2 px-2 sm:px-3 md:px-4 text-xs font-medium text-foreground">
                          {courseName}
                        </TableCell>
                        {feeCategoryKeys.map((catKey) => (
                          <TableCell key={catKey} className="py-2 px-1.5 sm:px-2 md:px-3 text-xs text-right">
                            {categoriesData[catKey] ? (
                              <Badge variant="outline" className="text-foreground font-mono text-[10px] sm:text-[11px] px-1 sm:px-1.5 py-0.5 border-border/50 bg-background/50">
                                {categoriesData[catKey].toLocaleString()}
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
