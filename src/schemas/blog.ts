import { z } from 'zod';

export const ZcreateBlog = z.object({
  body: z.object({
    title: z
      .string('Title is required')
      .trim()
      .min(1, 'Title is required')
      .max(180, 'Title cannot exceed 180 characters'),
    content: z
      .string('Content is required')
      .trim()
      .min(1, 'Content is required'),
    status: z
      .enum(['draft', 'published'] as const, {
        error: 'Invalid status provided',
      })
      .optional(),
  }),
});
