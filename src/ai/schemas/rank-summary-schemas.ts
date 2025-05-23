/**
 * @fileOverview Schemas and types for the rank summary AI flow.
 */
import { z } from 'zod';

// Define input schema
const PredictionResultSchema = z.object({
  campus: z.string(),
  course: z.string(),
  category: z.number().int().min(1).max(5),
  cutoff: z.number().int(),
});

export const RankSummaryInputSchema = z.object({
  rank: z.number().int().positive().describe('The student\'s VITEEE rank.'),
  category: z.number().int().min(1).max(5).describe('The target fee category (1-5) the student is aiming for or better.'),
  results: z.array(PredictionResultSchema).describe('The list of predicted campus/course options with the best possible fee category achieved.')
});
export type RankSummaryInput = z.infer<typeof RankSummaryInputSchema>;

// Define output schema
export const RankSummaryOutputSchema = z.object({
  summary: z.string().describe('A brief, encouraging summary of the prediction results, highlighting potential strengths and considerations.'),
});
export type RankSummaryOutput = z.infer<typeof RankSummaryOutputSchema>;
