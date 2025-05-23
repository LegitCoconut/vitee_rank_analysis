
'use client';

import type { FC } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  message: string;
}

function getInitials(name: string): string {
  if (!name) return '??';
  const names = name.trim().split(/\s+/);
  if (names.length === 1 && names[0]) {
    return names[0].substring(0, 2).toUpperCase();
  }
  if (names.length > 1 && names[0] && names[names.length - 1]) {
    return (names[0][0] + (names[names.length - 1][0] || '')).toUpperCase();
  }
  return name.substring(0,2).toUpperCase();
}

export const TestimonialCard: FC<TestimonialCardProps> = ({ name, message }) => {
  return (
    <Card className="w-72 md:w-80 flex-shrink-0 snap-start bg-card/60 backdrop-blur-sm border border-border/30 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
        <Avatar className="h-16 w-16 mb-4 border-2 border-primary/50">
          <AvatarFallback className="text-xl bg-primary/10 text-primary font-semibold">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <Quote className="h-8 w-8 text-accent/70 mb-2 transform scale-x-[-1]" />
        <p className="text-sm text-foreground italic leading-relaxed line-clamp-6 flex-grow">
          {message}
        </p>
        <p className="text-xs font-semibold text-primary mt-4">- {name}</p>
      </CardContent>
    </Card>
  );
};

    