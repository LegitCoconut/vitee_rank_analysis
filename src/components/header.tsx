
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Bell, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const changelogItems = [
  { id: 5, text: 'New: Share your rank data to help improve predictions!', date: 'May 7', new: true }, // New changelog item
  { id: 1, text: 'VIT Vellore ranks updated', date: 'May 6', new: false },
  { id: 2, text: 'VIT Chennai ranks updated', date: 'May 6', new: false },
  { id: 3, text: 'Accuracy of AI model improved', date: 'May 3', new: false },
  { id: 4, text: 'Community Forums launched', date: 'May 1', new: false },
];

export function Header() {
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);

  const handleSheetOpenChange = (open: boolean) => {
    setIsChangelogOpen(open);
  };

  return (
    <header className="bg-card/80 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/assets/favicon.png" // Using the provided favicon.png from assets
            alt="VIT Logo"
            width={150} // Adjusted width for better aspect ratio, can be tweaked
            height={40} // Kept height
            className="h-8 w-auto md:h-10 object-contain"
          />
          <span className="text-xl md:text-2xl font-bold text-primary tracking-tight group-hover:opacity-90 transition-opacity">
            VIT Rank Predictor
          </span>
        </Link>

        <Sheet open={isChangelogOpen} onOpenChange={handleSheetOpenChange}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="sr-only">View changelog</span>
              {changelogItems.some(item => item.new) && ( // Removed !isChangelogOpen to always show dot if new items exist
                <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[350px] sm:w-[400px] bg-card border-border shadow-xl p-0 flex flex-col">
            <SheetHeader className="p-6 pb-4 border-b border-border">
              <div className="flex justify-between items-center">
                <SheetTitle className="text-primary text-lg">Changelog & Updates</SheetTitle>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </div>
            </SheetHeader>
            <div className="flex-grow p-6 space-y-4 overflow-y-auto">
              {changelogItems.length === 0 && (
                <p className="text-sm text-muted-foreground">No new updates yet.</p>
              )}
              {changelogItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 p-3 rounded-md bg-secondary/50 border border-border/30">
                  <div className={`mt-1.5 h-2.5 w-2.5 rounded-full ${item.new ? 'bg-accent' : 'bg-muted-foreground/50'} flex-shrink-0`}></div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                   {item.new && <Badge variant="default" className="text-xs ml-auto self-start bg-accent text-accent-foreground">New</Badge>}
                </div>
              ))}
            </div>
            {/* Optional: Add a "View all updates" link if needed */}
            {/* <div className="p-4 border-t border-border text-center">
              <Link href="/changelog">
                <Button variant="link" size="sm" className="text-primary">View all updates</Button>
              </Link>
            </div> */}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
