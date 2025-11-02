import mongoose from 'mongoose';
import z from 'zod';

export const ZcommentBlog = z.object({
  params: z.object({
    blogId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid Blog ID',
    }),
  }),
  body: z.object({
    content: z
      .string('Content is required')
      .min(1, 'Content is required')
      .max(1000, 'Content must be less than 1000 characters'),
  }),
});

export const ZgetCommentsByBlog = z.object({
  params: z.object({
    blogId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid Blog ID',
    }),
  }),
});

export const ZdeleteComment = z.object({
  params: z.object({
    commentId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid Comment ID',
      }),
  }),
});
