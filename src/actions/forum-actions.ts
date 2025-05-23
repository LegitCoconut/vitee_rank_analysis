
'use server';

import { z } from 'zod';
import { addMessageToDB, getMessagesFromDB, type ForumMessageDocument as DBForumMessageDocument } from '@/services/mongodb';
import type { ObjectId } from 'mongodb';

// Define the client-friendly type where _id is a string
export interface ClientForumMessageDocument {
  _id?: string; // ObjectId converted to string
  forumId: string;
  author: string;
  content: string;
  timestamp: Date; // Date objects are serializable
}

// Re-exporting the client-friendly type for consumers of this action
export type ForumMessageDocument = ClientForumMessageDocument;

const ForumMessageInputSchema = z.object({
  forumId: z.string().min(1, 'Forum ID is required.'),
  author: z.string().min(2, 'Name must be at least 2 characters.').max(50, 'Name must be at most 50 characters.'),
  content: z.string().min(5, 'Message must be at least 5 characters.').max(1000, 'Message must be at most 1000 characters.'),
});

export type ForumMessageInput = z.infer<typeof ForumMessageInputSchema>;

interface AddMessageResult {
  success: boolean;
  message?: ClientForumMessageDocument; // Use client-friendly type
  error?: string;
}

interface GetMessagesResult {
  success: boolean;
  messages?: ClientForumMessageDocument[]; // Use client-friendly type
  error?: string;
}

/**
 * Server action to add a new message to a forum.
 * Converts ObjectId _id to string for the returned message.
 */
export async function addForumMessage(data: ForumMessageInput): Promise<AddMessageResult> {
  console.log('[addForumMessage Action] Started for forum:', data.forumId);
  const validationResult = ForumMessageInputSchema.safeParse(data);

  if (!validationResult.success) {
    console.error('[addForumMessage Action] Server-side validation failed:', validationResult.error.flatten().fieldErrors);
    return { success: false, error: 'Invalid message data provided.' };
  }

  const { forumId, author, content } = validationResult.data;
  const messageData = {
    forumId,
    author,
    content,
    timestamp: new Date(),
  };

  try {
    console.log('[addForumMessage Action] Attempting to add message to database:', messageData);
    const dbResult = await addMessageToDB(messageData);

    if (dbResult.success && dbResult.insertedMessage) {
      console.log('[addForumMessage Action] Message successfully added to database.');
      // Convert ObjectId _id to string for client consumption
      const clientMessage: ClientForumMessageDocument = {
        forumId: dbResult.insertedMessage.forumId,
        author: dbResult.insertedMessage.author,
        content: dbResult.insertedMessage.content,
        timestamp: dbResult.insertedMessage.timestamp,
        _id: dbResult.insertedMessage._id?.toString(),
      };
      return { success: true, message: clientMessage };
    } else {
      console.error('[addForumMessage Action] Error adding message to database:', dbResult.error);
      return { success: false, error: dbResult.error || 'Failed to save message. Please try again later.' };
    }
  } catch (error) {
    console.error('[addForumMessage Action] Unexpected error processing message:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again later.' };
  } finally {
    console.log('[addForumMessage Action] Finished for forum:', data.forumId);
  }
}

/**
 * Server action to get messages for a specific forum.
 * Converts ObjectId _id to string for each message.
 */
export async function getForumMessages(forumId: string): Promise<GetMessagesResult> {
  console.log('[getForumMessages Action] Started for forum:', forumId);
  if (!forumId || typeof forumId !== 'string' || forumId.trim() === '') {
    console.error('[getForumMessages Action] Invalid forumId provided.');
    return { success: false, error: 'Invalid Forum ID.' };
  }

  try {
    console.log('[getForumMessages Action] Attempting to fetch messages from database for forum:', forumId);
    const dbResult = await getMessagesFromDB(forumId);

    if (dbResult.success && dbResult.messages) {
      // Convert ObjectId _id to string for each message
      const clientMessages: ClientForumMessageDocument[] = dbResult.messages.map(
        (msg: DBForumMessageDocument) => ({
          forumId: msg.forumId,
          author: msg.author,
          content: msg.content,
          timestamp: msg.timestamp,
          _id: msg._id?.toString(),
        })
      );
      console.log('[getForumMessages Action] Messages fetched successfully for forum:', forumId, 'Count:', clientMessages.length);
      return { success: true, messages: clientMessages };
    } else {
      console.error('[getForumMessages Action] Error fetching messages from database for forum:', forumId, dbResult.error);
      return { success: false, error: dbResult.error || 'Failed to load messages.' };
    }
  } catch (error) {
    console.error('[getForumMessages Action] Unexpected error fetching messages for forum:', forumId, error);
    return { success: false, error: 'An unexpected error occurred while loading messages.' };
  } finally {
    console.log('[getForumMessages Action] Finished for forum:', forumId);
  }
}
