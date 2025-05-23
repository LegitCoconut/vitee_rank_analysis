
'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send, UserCircle, MessageSquarePlus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addForumMessage, getForumMessages, type ForumMessageInput, type ForumMessageDocument } from '@/actions/forum-actions';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';

const MessageSchema = z.object({
  author: z.string().min(2, 'Name must be at least 2 characters.').max(50, 'Name must be at most 50 characters.'),
  content: z.string().min(5, 'Message must be at least 5 characters.').max(1000, 'Message must be at most 1000 characters.'),
});

type MessageFormValues = z.infer<typeof MessageSchema>;

interface ForumProps {
  forumId: string;
}

export function Forum({ forumId }: ForumProps) {
  const [messages, setMessages] = useState<ForumMessageDocument[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const form = useForm<MessageFormValues>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      author: '',
      content: '',
    },
  });

  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    setError(null);
    try {
      const result = await getForumMessages(forumId);
      if (result.success && result.messages) {
        const sortedMessages = result.messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setMessages(sortedMessages);
      } else {
        setError(result.error || 'Failed to load messages.');
        setMessages([]);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('An unexpected error occurred while loading messages.');
      setMessages([]);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [forumId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const onSubmit: SubmitHandler<MessageFormValues> = async (data) => {
    setIsPosting(true);
    const messageInput: ForumMessageInput = {
      forumId,
      author: data.author,
      content: data.content,
    };

    try {
      const result = await addForumMessage(messageInput);
      if (result.success && result.message) {
        setMessages(prevMessages => [...prevMessages, result.message!]);
        form.reset();
        setIsPostModalOpen(false); // Close dialog on success
        toast({
          title: 'Message Posted!',
          description: 'Your message has been added to the forum.',
        });
      } else {
        toast({
          title: 'Error Posting Message',
          description: result.error || 'An unexpected error occurred.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Message submission error:', error);
      toast({
        title: 'Submission Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg p-0 h-16 w-16 flex items-center justify-center bg-primary hover:bg-primary/90">
            <MessageSquarePlus size={28} className="text-primary-foreground" />
            <span className="sr-only">Post a new message</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-primary">Post a Message</DialogTitle>
            <DialogDescription>Share your thoughts or ask a question.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} className="bg-background/70 backdrop-blur-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here..."
                        className="resize-none bg-background/70 backdrop-blur-sm min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isPosting} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {isPosting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Post Message
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Messages</h2>
        {isLoadingMessages ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-secondary/50 p-4 border border-border/30">
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/5 mt-1" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : messages.length === 0 ? (
          <p className="text-muted-foreground">No messages yet. Be the first to post!</p>
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 pb-24"> {/* Added padding-bottom for FAB */}
            {messages.map((msg) => (
              <Card key={msg._id?.toString()} className="bg-secondary/50 p-4 border border-border/30">
                <div className="flex items-start space-x-3">
                  <UserCircle className="h-10 w-10 text-muted-foreground flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-primary">{msg.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                    <p className="text-foreground mt-1 whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              </Card>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
