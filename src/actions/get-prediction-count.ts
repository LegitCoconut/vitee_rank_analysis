
'use server';

import { getPredictionCount as getCountFromDB } from '@/services/mongodb';

interface ActionResult {
  success: boolean;
  count?: number;
  message?: string;
}

/**
 * Server action to get the total prediction count from the database.
 */
export async function getPredictionCount(): Promise<ActionResult> {
  console.log('[getPredictionCount Action] Started.');
  try {
    const result = await getCountFromDB();
    if (result.success) {
      console.log('[getPredictionCount Action] Count fetched successfully:', result.count);
      return { success: true, count: result.count };
    } else {
      console.error('[getPredictionCount Action] Failed to fetch count:', result.error);
      // Return 0 but indicate failure in message for clarity in logs/UI if needed
      return { success: false, count: 0, message: result.error || 'Failed to fetch prediction count.' };
    }
  } catch (error) {
    console.error('[getPredictionCount Action] Unexpected error:', error);
    // Return 0 and error message
    return { success: false, count: 0, message: 'An unexpected error occurred while fetching the count.' };
  } finally {
     console.log('[getPredictionCount Action] Finished.');
  }
}
