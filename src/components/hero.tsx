
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown, FilePlus2 } from "lucide-react"; // Added FilePlus2
import Image from "next/image";
import type { MouseEvent } from 'react';

export function Hero() {
  const handleScrollClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("rank-predictor-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn('Scroll target #rank-predictor-section not found');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-start text-center bg-gradient-to-b from-background to-secondary/30 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/assets/vit_bg.jpg"
          alt="VIT Campus"
          fill
          className="object-cover object-center opacity-50"
          priority={true}
          data-ai-hint="university campus"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 mt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-6 drop-shadow-lg">
          Unlock Your Future at VIT
        </h1>
        <p className="text-lg md:text-xl text-foreground mb-8 max-w-3xl mx-auto">
          Embark on your journey to academic excellence. Discover the possibilities awaiting you at VIT by predicting your potential campus and course matches.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90" // Changed to primary blue
            >
            <Link
                href="#rank-predictor-section"
                scroll={true}
                onClick={handleScrollClick}
            >
                <span className="flex items-center">
                Explore Your Options <ArrowDown className="ml-2 h-5 w-5" />
                </span>
            </Link>
            </Button>
            <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            >
            <Link href="/submit-data">
                <span className="flex items-center">
                Share Your Data <FilePlus2 className="ml-2 h-5 w-5" />
                </span>
            </Link>
            </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Scroll down or click the button to get started. Help improve accuracy by sharing your data!</p>
      </div>

    </section>
  );
}
