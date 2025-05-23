
'use server';

import { incrementPredictionCount as incrementCountInDB } from '@/services/mongodb';

interface ActionResult {
  success: boolean;
  message?: string;
  newCount?: number;
}

/**
 * Server action to increment the prediction count in the database.
 */
export async function incrementPredictionCount(): Promise<ActionResult> {
  console.log('[incrementPredictionCount Action] Started.');
  try {
    const result = await incrementCountInDB();
    if (result.success) {
      console.log('[incrementPredictionCount Action] Count incremented successfully. New count:', result.updatedCount);
      return { success: true, newCount: result.updatedCount };
    } else {
      console.error('[incrementPredictionCount Action] Failed to increment count:', result.error);
      return { success: false, message: result.error || 'Failed to increment prediction count.' };
    }
  } catch (error) {
    console.error('[incrementPredictionCount Action] Unexpected error:', error);
    return { success: false, message: 'An unexpected error occurred while incrementing the count.' };
  } finally {
     console.log('[incrementPredictionCount Action] Finished.');
  }
}
