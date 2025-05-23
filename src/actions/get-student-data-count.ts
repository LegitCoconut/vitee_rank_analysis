
'use server';

import { getStudentRankDataCount as getCountFromDB } from '@/services/mongodb';

interface ActionResult {
  success: boolean;
  count?: number;
  message?: string;
}

/**
 * Server action to get the total student-submitted rank data count from the database.
 */
export async function getStudentDataCount(): Promise<ActionResult> {
  console.log('[getStudentDataCount Action] Started.');
  try {
    const result = await getCountFromDB();
    if (result.success) {
      console.log('[getStudentDataCount Action] Count fetched successfully:', result.count);
      return { success: true, count: result.count };
    } else {
      console.error('[getStudentDataCount Action] Failed to fetch count:', result.error);
      return { success: false, count: 0, message: result.error || 'Failed to fetch student data count.' };
    }
  } catch (error) {
    console.error('[getStudentDataCount Action] Unexpected error:', error);
    return { success: false, count: 0, message: 'An unexpected error occurred while fetching the count.' };
  } finally {
     console.log('[getStudentDataCount Action] Finished.');
  }
}
