import { z } from 'zod';

export const ZupdateUser = z.object({
  body: z.object({
    username: z
      .string()
      .min(2, 'Username must be at least 2 characters long')
      .max(20, "Username can't be longer than 20 characters")
      .optional(),
    email: z
      .email('Invalid email address')
      .max(50, "Email can't be longer than 50 characters")
      .optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(100, "Password can't be longer than 100 characters")
      .optional(),

    first_name: z
      .string()
      .max(20, "First name can't be longer than 20 characters")
      .optional(),
    last_name: z
      .string()
      .max(20, "Last name can't be longer than 20 characters")
      .optional(),
    website: z
      .url({ message: 'Website must be a valid URL' })
      .max(100, { message: 'Website address must be less than 100 characters' })
      .optional(),
    x: z
      .url({ message: 'X profile URL must be a valid URL' })
      .max(100, { message: 'X profile url must be less than 100 characters' })
      .optional(),
    facebook: z
      .url({ message: 'Facebook profile URL must be a valid URL' })
      .max(100, {
        message: 'Facebook profile url must be less than 100 characters',
      })
      .optional(),
    instagram: z
      .url({ message: 'Instagram profile URL must be a valid URL' })
      .max(100, {
        message: 'Instagram profile url must be less than 100 characters',
      })
      .optional(),
    linkedin: z
      .url({ message: 'LinkedIn profile URL must be a valid URL' })
      .max(100, {
        message: 'LinkedIn profile url must be less than 100 characters',
      })
      .optional(),
    youtube: z
      .url({ message: 'YouTube profile URL must be a valid URL' })
      .max(100, {
        message: 'YouTube channel url must be less than 100 characters',
      })
      .optional(),
  }),
});

export type ZupdateUser = z.infer<typeof ZupdateUser>['body'];
