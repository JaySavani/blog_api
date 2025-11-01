import mongoose from 'mongoose';
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

export const getAllBlog = z.object({
  query: z.object({
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : undefined))
      .refine(
        (val) =>
          val === undefined || (Number.isInteger(val) && val >= 1 && val <= 50),
        { message: 'Limit must be between 1 and 50' },
      ),

    offset: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : undefined))
      .refine(
        (val) => val === undefined || (Number.isInteger(val) && val >= 0),
        { message: 'Offset must be a non-negative integer' },
      ),
  }),
});

export const ZgetBlogsByUser = z.object({
  params: z.object({
    userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid User ID',
    }),
  }),
  query: z.object({
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : undefined))
      .refine(
        (val) =>
          val === undefined || (Number.isInteger(val) && val >= 1 && val <= 50),
        { message: 'Limit must be between 1 and 50' },
      ),

    offset: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : undefined))
      .refine(
        (val) => val === undefined || (Number.isInteger(val) && val >= 0),
        { message: 'Offset must be a non-negative integer' },
      ),
  }),
});
