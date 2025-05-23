
'use server';

import { z } from 'zod';
import { addStudentRankDataToDB, type StudentRankDataDocument as DBStudentRankDataDocument } from '@/services/mongodb';
import type { ObjectId } from 'mongodb';

// Define the client-friendly type where _id is a string
export interface ClientStudentRankDataDocument {
  _id?: string; // ObjectId converted to string
  rank: number;
  college: string;
  course: string;
  category: number;
  submittedAt: Date;
}

// Re-exporting the client-friendly type for consumers of this action
export type StudentRankDataDocument = ClientStudentRankDataDocument;

const StudentRankDataInputSchema = z.object({
  rank: z.number({ required_error: "Rank is required."}).int("Rank must be an integer.").positive("Rank must be a positive number.").min(1, "Rank is required."),
  college: z.string({ required_error: "College is required."}).min(1, "College is required."),
  course: z.string({ required_error: "Course is required."}).min(1, "Course is required."),
  category: z.number({ required_error: "Category is required."}).int("Category must be an integer.").min(1, "Category must be at least 1.").max(5, "Category must be at most 5."),
});

export type StudentRankDataInput = z.infer<typeof StudentRankDataInputSchema>;

interface SubmitDataResult {
  success: boolean;
  message?: ClientStudentRankDataDocument; // Use client-friendly type
  error?: string;
}

/**
 * Server action to submit student rank data.
 * Converts ObjectId _id to string for the returned data.
 */
export async function submitStudentRankData(data: StudentRankDataInput): Promise<SubmitDataResult> {
  console.log('[submitStudentRankData Action] Started for rank:', data.rank);
  const validationResult = StudentRankDataInputSchema.safeParse(data);

  if (!validationResult.success) {
    console.error('[submitStudentRankData Action] Server-side validation failed:', validationResult.error.flatten().fieldErrors);
    const errorMessages = Object.values(validationResult.error.flatten().fieldErrors).flat().join(' ');
    return { success: false, error: errorMessages || 'Invalid data provided.' };
  }

  const { rank, college, course, category } = validationResult.data;
  const rankData = {
    rank,
    college,
    course,
    category,
    submittedAt: new Date(),
  };

  try {
    console.log('[submitStudentRankData Action] Attempting to add data to database:', rankData);
    const dbResult = await addStudentRankDataToDB(rankData);

    if (dbResult.success && dbResult.insertedData) {
      console.log('[submitStudentRankData Action] Data successfully added to database.');
      // Convert ObjectId _id to string for client consumption
      const clientData: ClientStudentRankDataDocument = {
        rank: dbResult.insertedData.rank,
        college: dbResult.insertedData.college,
        course: dbResult.insertedData.course,
        category: dbResult.insertedData.category,
        submittedAt: dbResult.insertedData.submittedAt,
        _id: dbResult.insertedData._id?.toString(),
      };
      return { success: true, message: clientData };
    } else {
      console.error('[submitStudentRankData Action] Error adding data to database:', dbResult.error);
      return { success: false, error: dbResult.error || 'Failed to save data. Please try again later.' };
    }
  } catch (error) {
    console.error('[submitStudentRankData Action] Unexpected error processing data:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again later.' };
  } finally {
    console.log('[submitStudentRankData Action] Finished for rank:', data.rank);
  }
}
