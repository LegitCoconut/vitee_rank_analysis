
'use server';

import { getAllStudentRankDataFromDB, type StudentRankDataDocument as DBStudentRankDataDocument } from '@/services/mongodb';
import type { ObjectId } from 'mongodb';

// Client-friendly type where _id is string
export interface ClientStudentRankData {
  _id: string;
  rank: number;
  college: string;
  course: string;
  category: number;
  submittedAt: Date;
}

// Type for the processed data structure
export interface ProcessedCutoffData {
  [collegeName: string]: {
    [courseName: string]: {
      [category: number]: number; // Highest rank for this category
    };
  };
}

interface GetStudentDataResult {
  success: boolean;
  data?: ProcessedCutoffData;
  error?: string;
  rawCount?: number;
}

/**
 * Server action to get all student-submitted rank data,
 * process it to find the highest rank for each college/course/category combination.
 * Converts ObjectId _id to string.
 */
export async function getAllStudentRankData(): Promise<GetStudentDataResult> {
  console.log('[getAllStudentRankData Action] Started.');
  try {
    const dbResult = await getAllStudentRankDataFromDB();

    if (dbResult.success && dbResult.data) {
      console.log('[getAllStudentRankData Action] Data fetched successfully. Count:', dbResult.data.length);
      const processedData: ProcessedCutoffData = {};

      // Convert ObjectId to string and then process
      const clientData: ClientStudentRankData[] = dbResult.data.map(
        (doc: DBStudentRankDataDocument) => ({
          ...doc,
          _id: doc._id!.toString(), // Assert _id is present
        })
      );

      for (const entry of clientData) {
        if (!processedData[entry.college]) {
          processedData[entry.college] = {};
        }
        if (!processedData[entry.college][entry.course]) {
          processedData[entry.college][entry.course] = {};
        }

        // If category data doesn't exist or current entry's rank is higher (worse cutoff), update it
        if (
          !processedData[entry.college][entry.course][entry.category] ||
          entry.rank > processedData[entry.college][entry.course][entry.category]
        ) {
          processedData[entry.college][entry.course][entry.category] = entry.rank;
        }
      }
      console.log('[getAllStudentRankData Action] Data processed successfully.');
      return { success: true, data: processedData, rawCount: dbResult.data.length };
    } else {
      console.error('[getAllStudentRankData Action] Error fetching data from database:', dbResult.error);
      return { success: false, error: dbResult.error || 'Failed to load student data.' };
    }
  } catch (error) {
    console.error('[getAllStudentRankData Action] Unexpected error:', error);
    return { success: false, error: 'An unexpected error occurred while loading student data.' };
  } finally {
    console.log('[getAllStudentRankData Action] Finished.');
  }
}
