
'use server';

import { getFeedbackCount as getCountFromDB } from '@/services/mongodb';

interface ActionResult {
  success: boolean;
  count?: number;
  message?: string;
}

/**
 * Server action to get the total feedback count from the database.
 */
export async function getFeedbackCount(): Promise<ActionResult> {
  console.log('[getFeedbackCount Action] Started.');
  try {
    const result = await getCountFromDB();
    if (result.success) {
      console.log('[getFeedbackCount Action] Count fetched successfully:', result.count);
      return { success: true, count: result.count };
    } else {
      console.error('[getFeedbackCount Action] Failed to fetch count:', result.error);
      // Return 0 but indicate failure in message for clarity in logs/UI if needed
      return { success: false, count: 0, message: result.error || 'Failed to fetch feedback count.' };
    }
  } catch (error) {
    console.error('[getFeedbackCount Action] Unexpected error:', error);
    // Return 0 and error message
    return { success: false, count: 0, message: 'An unexpected error occurred while fetching the feedback count.' };
  } finally {
     console.log('[getFeedbackCount Action] Finished.');
  }
}
