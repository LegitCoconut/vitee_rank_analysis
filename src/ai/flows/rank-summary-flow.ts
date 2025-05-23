'use server';
/**
 * @fileOverview AI flow to summarize VIT rank prediction results.
 *
 * - summarizeRank - Generates a brief summary based on rank, target category, and prediction results.
 * Only exports the async function and associated types. Schemas are defined elsewhere.
 */

import { ai } from '@/ai/ai-instance';
import {
  RankSummaryInputSchema,
  RankSummaryOutputSchema,
  type RankSummaryInput, // Import type only
  type RankSummaryOutput // Import type only
} from '@/ai/schemas/rank-summary-schemas'; // Import from the new schema file

// Types should be imported directly from the schema file by consumers.


// Define the prompt for the AI
const summaryPrompt = ai.definePrompt({
    name: 'rankSummaryPrompt',
    input: { schema: RankSummaryInputSchema }, // Use imported schema
    output: { schema: RankSummaryOutputSchema }, // Use imported schema
    prompt: `You are an academic advisor summarizing VITEEE rank prediction results for a student.
    The student's rank is {{rank}} and they are targeting Fee Category {{category}} or better (lower category number is better/lower fee).
    The prediction results show potential campus/course options and the *best possible* fee category they *might* achieve based on *estimated* historical data.

    Results:
    {{#if results}}
        {{#each results}}
        - Campus: {{campus}}, Course: {{course}}, Best Estimated Category: {{category}} (Cutoff: ~{{cutoff}})
        {{/each}}
    {{else}}
        No likely options found for this rank and target category based on estimates.
    {{/if}}

    Based on these results, provide a brief (2-3 sentences), encouraging summary.
    Highlight any strong possibilities (e.g., achieving the target category or better in preferred courses/campuses if specified in results).
    Mention the general competitiveness based on the rank.
    If no results were found, gently suggest considering higher fee categories or broadening preferences.
    ALWAYS remind the student that these are *estimates* based on historical data and official counseling results determine final admission and category.
    Keep the tone positive and helpful. Focus on interpreting the provided results. Do not invent new possibilities.`,
});

// Define the flow
const rankSummaryFlow = ai.defineFlow(
  {
    name: 'rankSummaryFlow',
    inputSchema: RankSummaryInputSchema, // Use imported schema
    outputSchema: RankSummaryOutputSchema, // Use imported schema
  },
  async (input) => {
    try {
      const { output } = await summaryPrompt(input);
      // Ensure output is not null before returning
      if (!output) {
          console.error("[rankSummaryFlow] AI output was null.");
          throw new Error("AI failed to generate a summary.");
      }
      return output;
    } catch(error) {
        console.error("[rankSummaryFlow] Error calling summaryPrompt:", error);
        // Re-throw the error to be caught by the caller
        throw error;
    }
  }
);


// Exported async wrapper function
export async function summarizeRank(input: RankSummaryInput): Promise<RankSummaryOutput> {
  return rankSummaryFlow(input);
}
