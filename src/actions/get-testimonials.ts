
'use server';

import { getTestimonialsFromDB, type TestimonialDocument as DBTestimonialDocument } from '@/services/mongodb';
import type { ObjectId } from 'mongodb';

// Define the type for client-side consumption where _id is a string
export interface ClientTestimonialDocument {
  _id?: string; // ObjectId converted to string
  name: string;
  message: string;
  // Optional: add other fields like 'course', 'year', 'imageUrl' if needed
}

// Re-exporting the client-friendly type for consumers of this action
export type TestimonialDocument = ClientTestimonialDocument;

interface GetTestimonialsResult {
  success: boolean;
  testimonials?: ClientTestimonialDocument[]; // Use the client-friendly type
  error?: string;
}

/**
 * Server action to get testimonials.
 * Converts ObjectId _id to string for client-side compatibility.
 */
export async function getTestimonials(): Promise<GetTestimonialsResult> {
  console.log('[getTestimonials Action] Started.');
  try {
    console.log('[getTestimonials Action] Attempting to fetch testimonials from database.');
    const dbResult = await getTestimonialsFromDB();

    if (dbResult.success && dbResult.testimonials) {
      console.log('[getTestimonials Action] Testimonials fetched successfully. Count:', dbResult.testimonials?.length);
      // Convert ObjectId _id to string for each testimonial
      const clientTestimonials: ClientTestimonialDocument[] = dbResult.testimonials.map(
        (testimonial: DBTestimonialDocument) => ({
          ...testimonial,
          _id: testimonial._id?.toString(), // Convert ObjectId to string
        })
      );
      return { success: true, testimonials: clientTestimonials };
    } else {
      console.error('[getTestimonials Action] Error fetching testimonials from database:', dbResult.error);
      return { success: false, error: dbResult.error || 'Failed to load testimonials.' };
    }
  } catch (error) {
    console.error('[getTestimonials Action] Unexpected error fetching testimonials:', error);
    return { success: false, error: 'An unexpected error occurred while loading testimonials.' };
  } finally {
    console.log('[getTestimonials Action] Finished.');
  }
}
