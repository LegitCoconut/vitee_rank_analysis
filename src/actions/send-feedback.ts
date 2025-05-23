
'use server';

import { z } from 'zod';
import { addFeedbackToDB } from '@/services/mongodb'; // Import the MongoDB service function

// Define the schema for input validation (matches the client-side schema)
const FeedbackSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().min(10).max(500),
});

export type FeedbackInput = z.infer<typeof FeedbackSchema>; // Export the type

interface ActionResult {
  success: boolean;
  message?: string;
}

/**
 * Server action to handle feedback form submissions.
 * Validates the input and stores it in the MongoDB database.
 */
export async function sendFeedback(data: FeedbackInput): Promise<ActionResult> {
  console.log('[sendFeedback] Action started.'); // Log action start

  // Validate the data on the server side
  const validationResult = FeedbackSchema.safeParse(data);

  if (!validationResult.success) {
    // Log detailed validation errors for debugging
    console.error('[sendFeedback] Server-side validation failed:', validationResult.error.flatten().fieldErrors);
    return { success: false, message: 'Invalid feedback data provided.' };
  }

  console.log('[sendFeedback] Validation successful.'); // Log validation success
  const { name, email, message } = validationResult.data;
  const feedbackData = {
        name,
        email: email || null, // Store null if email is not provided
        message,
        submittedAt: new Date(),
    };

  try {
    console.log('[sendFeedback] Attempting to add feedback to database:', feedbackData); // Log before DB call
    // Add the feedback to the MongoDB database
    const dbResult = await addFeedbackToDB(feedbackData);

    if (dbResult.success) {
        console.log('[sendFeedback] Feedback successfully added to database.'); // Log DB success
        return { success: true };
    } else {
        // Log the specific database error if available
        console.error('[sendFeedback] Error adding feedback to database:', dbResult.error);
        return { success: false, message: dbResult.error || 'Failed to save feedback. Please try again later.' };
    }

  } catch (error) {
    console.error('[sendFeedback] Unexpected error processing feedback:', error);
    // Generic error message for unexpected issues
    return { success: false, message: 'An unexpected error occurred. Please try again later.' };
  } finally {
     console.log('[sendFeedback] Action finished.'); // Log action end
  }
}
