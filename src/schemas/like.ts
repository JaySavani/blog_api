import mongoose from 'mongoose';
import z from 'zod';

export const ZlikeBlog = z.object({
  params: z.object({
    blogId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid Blog ID',
    }),
  }),
});

export const ZdisLikeBlog = z.object({
  params: z.object({
    blogId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid Blog ID',
    }),
  }),
});
